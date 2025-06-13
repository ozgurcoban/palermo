"use server";

import { z } from "zod";
import { Resend } from "resend";
import { ContactFormSchema } from "@/lib/ContactFormSchema";
import ContactFormEmail from "@/components/Contact/EmailTemplate";
import AdminEmailTemplate from "@/components/Contact/AdminEmailTemplate";

type ContactFormInputs = z.infer<typeof ContactFormSchema> & { locale: string };
const resend = new Resend(process.env.RESEND_API_KEY);

async function verifyRecaptcha(token: string | undefined) {
  if (!token || token === "") {
    // Allow empty token for when reCAPTCHA is still loading
    console.log("No reCAPTCHA token provided, skipping verification");
    return { success: true };
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.error("reCAPTCHA secret key not configured");
    return { success: false, error: "reCAPTCHA not configured" };
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secretKey}&response=${token}`,
      },
    );

    const data = await response.json();

    if (!data.success) {
      console.error("reCAPTCHA verification failed:", data);
      return { success: false, error: "reCAPTCHA verification failed" };
    }

    // Check score for v3 (0.0 - 1.0, where 1.0 is very likely a good interaction)
    if (data.score && data.score < 0.5) {
      console.warn("Low reCAPTCHA score:", data.score);
      return { success: false, error: "Suspicious activity detected" };
    }

    return { success: true };
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return { success: false, error: "Failed to verify reCAPTCHA" };
  }
}

export async function sendMail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data);

  if (result.success) {
    const { name, email, message, recaptchaToken } = result.data;
    const { locale } = data;

    // Verify reCAPTCHA
    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaResult.success) {
      return {
        success: false,
        error: recaptchaResult.error || "reCAPTCHA verification failed",
      };
    }

    try {
      // Skicka e-post till Palermo
      const adminEmail = await resend.emails.send({
        from: "Palermo Uppsala <noreply@palermo-uppsala.se>",
        to: ["info@palermo-uppsala.se"],
        subject: `Nytt meddelande från ${name} - Palermo hemsida`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        react: AdminEmailTemplate({ name, email, message }),
      });

      if (adminEmail.error) {
        console.error("Admin email error:", adminEmail.error);
        return {
          success: false,
          error: adminEmail.error.message || "Failed to send admin email",
        };
      }

      // Skicka bekräftelse till kunden
      const customerEmail = await resend.emails.send({
        from: "Palermo Uppsala <noreply@palermo-uppsala.se>", // Ändra när domänen är verifierad
        to: [email], // Kundens e-post
        subject:
          locale === "en"
            ? "Thank you for your message - Palermo Uppsala"
            : "Tack för ditt meddelande - Palermo Uppsala",
        text:
          locale === "en"
            ? `Hello ${name},\n\nWe have received your message and will get back to you as soon as possible.\n\nBest regards,\nPalermo Uppsala`
            : `Hej ${name},\n\nVi har tagit emot ditt meddelande och återkommer så snart som möjligt.\n\nMed vänliga hälsningar,\nPalermo Uppsala`,
        react: ContactFormEmail({ name, email, message, locale }),
      });

      if (customerEmail.error) {
        console.error("Customer email error:", customerEmail.error);
        // Vi loggar fel men låter det gå igenom om admin-mejlet gick
      }

      return { success: true, data: adminEmail };
    } catch (error) {
      console.error("Send mail error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }
  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}
