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
              {/* ポイント. LabelとInputの紐付けは自動的に行われます */}
              <FormLabel>お問い合わせ</FormLabel>
              {/* ポイント. コントロールコンポーネント も 非コントロールコンポーネント も React Hook Form の Controller で管理しています */}
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
        {/* ポイント. https://zenn.dev/kazuya_aoyagi/articles/0bf76dded73b76 */}
        <FormField
          control={form.control}
          name="attachedFiles"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel>添付ファイル</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  className="border"
                  onChange={(event: any) =>
                    onChange(event.target.files && event.target.files)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ポイント. isValid && isSubmitting でバリデーションエラーやデータ送信エラーを確認します */}

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
