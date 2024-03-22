"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { useTranslations } from "next-intl";

import { ContactFormSchema } from "@/lib/ContactFormSchema";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { sendMail } from "@/app/(user)/_actions";
import FadeUp from "../ui/FadeUp";

export type ContactFormInputs = z.infer<typeof ContactFormSchema>;

export default function ContactForm() {
  const t = useTranslations("ContactSection");
  const b = useTranslations("Buttons");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormInputs>({ resolver: zodResolver(ContactFormSchema) });

  const processForm: SubmitHandler<ContactFormInputs> = async data => {
    const result = await sendMail(data);

    if (result?.success) {
      toast({
        title: t("Form.title"),
        description: t("Form.description"),
      });
      reset();
      return;
    }
    toast({
      variant: "destructive",
      title: t("Form.errorTitle"),
      description: t("Form.errorDescription"),
    });
  };
  return (
    <form onSubmit={handleSubmit(processForm)} className="self-start">
      <FadeUp delay={1.4}>
        <h2 className="title-secondary flex">{t("getInTouch")}</h2>

        <div className="flex gap-2 md:gap-4 pb-4 pt-3">
          {/* Name field */}

          <div className="flex-1">
            <input
              className=" border-2 border-dark w-full px-3 py-4 placeholder:capitalize rounded"
              placeholder={t("name")}
              {...register("name")}
            />
            {errors.name?.message && (
              <p className="ml-1 mt-1 text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email field */}
          <div className="flex-1">
            <input
              className="flex-1 border-2 border-dark w-full px-3 py-4  placeholder:capitalize rounded"
              placeholder={t("email")}
              {...register("email")}
            />
            {errors.email?.message && (
              <p className="ml-1 mt-1 text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        {/* Message field */}
        <div className="">
          <textarea
            rows={5}
            placeholder={t("message")}
            className="border-2 border-dark w-full p-4 placeholder:capitalize rounded"
            {...register("message")}
          />
          {errors.message?.message && (
            <p className="ml-1 text-sm text-destructive">
              {errors.message.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          size={"lg"}
          className="mt-4 bg-accent"
          aria-disabled={isSubmitting}
          disabled={isSubmitting}
        >
          {b("submit")}
        </Button>
      </FadeUp>
    </form>
  );
}
