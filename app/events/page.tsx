"use client";
import { Card } from "@/components/Card";
import { EventPlayground } from "@/components/EventsClient";
import { useChecklist } from "@/components/progress";

export default function Page(){
  const { mark } = useChecklist();
  return (
    <section>
      <h2 className="text-base font-semibold mb-3">イベント処理</h2>

      <Card title="preventDefault / stopPropagation 実験場">
        <form
          onSubmit={(e)=>{
            e.preventDefault();
            mark("events_prevent_stop");
            alert("送信を preventDefault しました！");
          }}
          className="rounded-xl border p-3 bg-white grid gap-2"
        >
          <label className="text-sm">お名前</label>
          <input className="border rounded-lg px-3 py-2 w-full mt-1" placeholder="Taro" />
          <div className="mt-1">
            <button className="px-3 py-2 rounded-xl shadow border text-sm">送信（止まる）</button>
          </div>
        </form>
        <hr className="my-4" />
        <EventPlayground />
      </Card>
    </section>
  );
}
