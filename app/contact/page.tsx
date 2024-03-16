"use client";

import { useState } from "react";
import { useFormState } from "react-dom";

// form
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ui libraty
import { Form } from "@/components/ui/form";

// components
import Entry from "./component/contact_entry";
import Confirm from "./component/contact_confirm";

import { contactAction } from "@/actions/actions";

const contactSchema = z.object({
  username: z.string().min(1, { message: "名前を入力してください" }).max(30),
  content: z
    .string()
    .min(1, { message: "お問い合わせを入力してください" })
    .max(30, { message: "お問い合わせは30文字以内で入力してください" }),
  attachedFiles: z.custom<FileList>(),
});

const Contact = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const onNext = () => {
    setPageNumber((state) => state + 1);
  };

  const onPrev = () => {
    setPageNumber((state) => state - 1);
  };

  const [lastResult, action] = useFormState(contactAction, undefined);

  const form = useForm<z.infer<typeof contactSchema>>({
    lastResult,
    criteriaMode: "all",
    mode: "onChange",
    resolver: zodResolver(contactSchema),
    defaultValues: {
      username: "",
      content: "",
    },
  });

  return (
    <div>
      <Form {...form} onSubmit={form.onSubmit} action={action}>
        <form>
          {pageNumber === 0 ? (
            <>
              <Entry form={form} onNext={onNext} />
            </>
          ) : (
            <>
              <Confirm form={form} onPrev={onPrev} />
            </>
          )}
        </form>
      </Form>
    </div>
  );
};

export default Contact;
