"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";

import { ContactFormSchema } from "@/lib/ContactFormSchema";
import { sendMail } from "@/app/_actions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

export type ContactFormInputs = z.infer<typeof ContactFormSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<ContactFormInputs>({ resolver: zodResolver(ContactFormSchema) });

  const processForm: SubmitHandler<ContactFormInputs> = async data => {
    const result = await sendMail(data);

    if (result?.success) {
      console.log({ data: result.data });
      toast({
        title: "Message was sent!",
        description: "Successfully sent your message.",
      });
      reset();
      return;
    }
    console.log(result?.error);
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
    });
  };
  return (
    <form onSubmit={handleSubmit(processForm)} className="self-start">
      <h2 className="title-secondary flex">get in touch</h2>
      <div className="flex gap-2 md:gap-4 pb-4 pt-3">
        {/* Name field */}
        <div className="flex-1">
          <input
            className=" border-2 border-accent w-full py-2 px-4"
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
            className="flex-1 border-2 border-accent w-full py-2 px-4"
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
          className="border-2 border-accent w-full py-2 px-4"
          {...register("message")}
        />
        {errors.message?.message && (
          <p className="ml-1 text-sm text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>
      <Button type="submit" className="mt-4 bg-dark">
        Submit
      </Button>
    </form>
  );
}
