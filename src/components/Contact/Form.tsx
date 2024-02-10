"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";

import { ContactFormSchema } from "@/lib/ContactFormSchema";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { sendMail } from "@/app/(user)/_actions";

export type ContactFormInputs = z.infer<typeof ContactFormSchema>;

export default function ContactForm() {
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
        title: "Thanks!",
        description: "We'll read your email and back to you soon 😊",
      });
      reset();
      return;
    }
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
    });
  };
  return (
    <form onSubmit={handleSubmit(processForm)} className="self-start">
      <h2 className="title-secondary flex">Get in touch</h2>
      <div className="flex gap-2 md:gap-4 pb-4 pt-3">
        {/* Name field */}
        <div className="flex-1">
          <input
            className=" border-2 border-dark w-full px-3 py-4 placeholder:capitalize rounded-lg"
            placeholder="name"
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
            className="flex-1 border-2 border-dark w-full px-3 py-4  placeholder:capitalize rounded-lg"
            placeholder="email"
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
          placeholder="message"
          className="border-2 border-dark w-full p-4 placeholder:capitalize rounded-lg"
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
        className="mt-4 text-base hover:tracking-wide uppercase dark-border-image bg-transparent py-7 hover:text-rose-500 hover:bg-transparent hover:scale-105"
        aria-disabled={isSubmitting}
        disabled={isSubmitting}
      >
        Submit
      </Button>
    </form>
  );
}
