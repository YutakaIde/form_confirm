"use client";

import { useState } from "react";

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
  attachedFiles: z.custom<Array<File>>().refine((files: Array<File>) => {
    const total = files.reduce((sum: number, file: File) => {
      return sum + file.size;
    }, 0);
    return total <= 400000 ? true : false;
  }, "合計サイズを 4000000 以下にしてください。"),
});

const Contact = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const onNext = () => {
    setPageNumber((state: number) => state + 1);
  };

  const onPrev = () => {
    setPageNumber((state: number) => state - 1);
  };

  const onSubmit = async (data) => {
    const values = form.getValues();
    const formData = new FormData();

    formData.append("username", values.username);
    formData.append("content", values.content);

    Array.from(values.attachedFiles).map((file: any, index: any) => {
      formData.append(`attachedFiles`, file);
    });

    contactAction(formData);
  };

  const form = useForm<z.infer<typeof contactSchema>>({
    criteriaMode: "all",
    mode: "onChange",
    resolver: zodResolver(contactSchema),
    defaultValues: {
      username: "",
      content: "",
      attachedFiles: [],
    },
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
