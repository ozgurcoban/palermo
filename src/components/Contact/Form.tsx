"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { useTranslations, useLocale } from "next-intl";
import { useState, useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { ContactFormSchema } from "@/lib/ContactFormSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { sendMail } from "@/app/(user)/_actions";
import { trackContactFormSubmit, trackContactFormStart } from "@/lib/gtag";
import { CheckCircle2, XCircle } from "lucide-react";

export type ContactFormInputs = z.infer<typeof ContactFormSchema>;

export default function ContactForm() {
  const t = useTranslations("ContactSection");
  const b = useTranslations("Buttons");
  const locale = useLocale();
  const [hasStartedForm, setHasStartedForm] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  
  const form = useForm<ContactFormInputs>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const handleFormStart = () => {
    if (!hasStartedForm) {
      trackContactFormStart();
      setHasStartedForm(true);
    }
  };

  const processForm: SubmitHandler<ContactFormInputs> = useCallback(async (data) => {
    if (!executeRecaptcha) {
      console.error("reCAPTCHA not available");
      toast({
        variant: "destructive",
        title: t("Form.errorTitle"),
        description: (
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            <span>{t("Form.errorDescription")}</span>
          </div>
        ),
      });
      return;
    }

    const recaptchaToken = await executeRecaptcha("contact_form");
    const result = await sendMail({ ...data, recaptchaToken, locale });

    if (result?.success) {
      trackContactFormSubmit();
      toast({
        title: t("Form.title"),
        description: (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-foreground" />
            <span>{t("Form.description")}</span>
          </div>
        ),
      });
      form.reset();
      setHasStartedForm(false);
      return;
    }
    
    // Log error for debugging
    console.error("Form submission error:", result?.error);
    
    toast({
      variant: "destructive",
      title: t("Form.errorTitle"),
      description: (
        <div className="flex items-center gap-2">
          <XCircle className="h-4 w-4" />
          <span>{t("Form.errorDescription")}</span>
        </div>
      ),
    });
  }, [executeRecaptcha, locale, t, form]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processForm)} className="space-y-6">
          <div className="mb-8">
            <h3 className="title-card mb-4">{t("formTitle")}</h3>
            <p className="text-base text-muted-foreground">{t("formDescription")}</p>
          </div>

          <div className="grid gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Name field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={t("name")}
                        className="h-12 border border-border bg-background px-4 text-base placeholder:capitalize focus:border-accent focus:ring-2 focus:ring-accent/20"
                        onFocus={handleFormStart}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("email")}
                        className="h-12 border border-border bg-background px-4 text-base placeholder:capitalize focus:border-accent focus:ring-2 focus:ring-accent/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Message field */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder={t("message")}
                      className="min-h-[140px] resize-none border border-border bg-background p-4 text-base placeholder:capitalize focus:border-accent focus:ring-2 focus:ring-accent/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="text-sm text-muted-foreground italic">
              {t("privacyNote")}
            </p>

            <Button
              type="submit"
              size="lg"
              className="mt-2 bg-accent hover:bg-accent/90"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  {t("sending")}
                </span>
              ) : (
                b("submit")
              )}
            </Button>
          </div>
      </form>
    </Form>
  );
}
