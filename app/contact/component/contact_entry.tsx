"use client";

// ui libraty
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Dropzone from "react-dropzone";

// icons
import { X } from "lucide-react";

const Entry = ({ form, onNext }: { form: any; onNext: () => void }) => {
  const { isSubmitting, isValid } = form.formState;

  return (
    <>
      <div className="flex flex-col p-2 m-2 border">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="my-2">
              <FormLabel>名前</FormLabel>
              <FormControl>
                <Input type="text" {...field} className="border w-1/2" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="my-2">
              {/* LabelとInputの紐付けは自動的に行われます */}
              <FormLabel>お問い合わせ</FormLabel>
              {/* コントロールコンポーネント も 非コントロールコンポーネント も React Hook Form の Controller で管理しています */}
              <FormControl>
                <Input type="text" {...field} className="border w-1/2" />
              </FormControl>
              <FormDescription>
                例: お名前、メールアドレス、お問い合わせ
              </FormDescription>
              {/* ポイント. nameで指定された値にバリデーションエラーが起きるとここにメッセージが表示されます */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="attachedFiles"
          render={({ field: { value, onChange }, fieldState }) => (
            <FormItem>
              <FormLabel>添付ファイル</FormLabel>
              <FormControl>
                <>
                  <ul>
                    {value &&
                      value.map((file: any, index: any) => (
                        <li key={index} className="flex items-center">
                          <span className="min-w-[180pt]">{file.name}</span>
                          <X
                            onClick={() => {
                              value.splice(index, 1);
                              onChange(value);
                            }}
                            size={22}
                            className="cursor-pointer"
                          />
                        </li>
                      ))}
                  </ul>
                  <Dropzone
                    accept={{
                      "image/gif": [],
                      "image/jpeg": [],
                      "image/png": [],
                      "image/svg+xml": [],
                    }}
                    noClick
                    onDrop={(acceptedFiles) => {
                      Array.from(acceptedFiles).map((file: any, index: any) => {
                        value.push(file);
                      });

                      onChange(value);
                    }}
                  >
                    {({ getRootProps, getInputProps, open, isDragActive }) => (
                      <div onClick={open}>
                        <div
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                          style={{
                            borderStyle: "dashed",
                            backgroundColor: isDragActive
                              ? `#808080`
                              : "transparent",
                          }}
                          {...getRootProps()}
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-10 h-10 mb-3 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              ></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                          <input
                            {...getInputProps({
                              onChange,
                            })}
                            onChange={(e) => {
                              Array.from(e.target.files).map(
                                (file: any, index: any) => {
                                  value.push(file);
                                },
                              );

                              onChange(value);
                            }}
                          />

                          <div>
                            {fieldState.error && (
                              <span role="alert">
                                {fieldState.error.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </>
              </FormControl>
              <FormDescription>添付ファイルを選択してください</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* isValid && isSubmitting でバリデーションエラーやデータ送信エラーを確認します */}

        <Button
          type="button"
          className="border mt-4"
          disabled={!isValid || isSubmitting}
          onClick={onNext}
        >
          確認へ
        </Button>
      </div>
    </>
  );
};

export default Entry;
