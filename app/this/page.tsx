"use client";
import { Card, Button } from "@/components/Card";
import { ThisDemo } from "@/components/EventsClient";
import { useChecklist } from "@/components/progress";

export default function Page(){
  const { mark } = useChecklist();
  return (
    <section>
      <h2 className="text-base font-semibold mb-3">Arrow 関数と this の違い</h2>
      <Card title="デモ">
        <ThisDemo />
        <div className="mt-3 text-sm text-gray-700">
          <ul className="list-disc ml-5 space-y-1">
            <li>Arrow は <b>this を持たない</b>（外側の this を継承）。</li>
            <li>メソッドには通常 function を使い、必要に応じて <code>.bind()</code>。</li>
            <li>イベントハンドラは Arrow で OK（this を使わないため）。</li>
          </ul>
        </div>
        <div className="mt-2">
          <Button onClick={()=>mark("arrow_vs_this")}>理解したらチェック</Button>
        </div>
      </Card>
    </section>
  );
}
