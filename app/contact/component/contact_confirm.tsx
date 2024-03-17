"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Confirm = ({ form, onPrev }: { form: any; onPrev: () => void }) => {
  const values = form.getValues();

  return (
    <>
      <div className="flex flex-col p-2 m-2 border">
        <div className="my-2">名前</div>
        <div>{values.username && values.username}</div>
        <Separator className="my-4" />
        <div className="my-2">問い合わせ</div>
        <div>{values.content && values.content}</div>
        <Separator className="my-4" />
        <div className="my-2">添付ファイル</div>
        <div>
          {/* ポイント. FileListはArrayでない https://zenn.dev/tokiya_horikawa/articles/8270949e4f027fce4d66 */}
          {values.attachedFiles &&
            values.attachedFiles.map((file: File, index: number) => {
              return <div key={index}>{file.name}</div>;
            })}
        </div>
        <Separator className="my-4" />
        <Button type="submit" className="border mt-4">
          送信する
        </Button>
        {/* ポイント. イベントハンドラーで処理を記述するより コンポーネントを使用する (ただし、以下のような注意が必要になるかもしれません。) */}
        {/* https://nextjs.org/docs/app/api-reference/components/link#if-the-child-is-a-functional-component */}
        <Button className="border mt-4" onClick={onPrev}>
          戻る
        </Button>
      </div>
    </>
  );
};

export default Confirm;
