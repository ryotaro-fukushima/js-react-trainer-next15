"use client";
import { useState } from "react";
import { Button } from "@/components/Card";

export function EventPlayground(){
  const [log, setLog] = useState<string[]>([]);
  const [capture, setCapture] = useState(false);
  const [useStop, setUseStop] = useState(false);
  const push = (msg: string) => setLog((l)=>[msg, ...l]);

  const handler = (label: string) => (e: React.MouseEvent<HTMLElement>) => {
    if (useStop) e.stopPropagation();
    push(`${label} ${capture ? "(capture)" : "(bubble)"}`);
  };

  const outerProps = capture ? { onClickCapture: handler("outer") } : { onClick: handler("outer") };
  const middleProps = capture ? { onClickCapture: handler("middle") } : { onClick: handler("middle") };
  const innerProps = capture ? { onClickCapture: handler("inner") } : { onClick: handler("inner") };

  return (
    <div className="grid gap-3">
      <div className="flex gap-3 items-center">
        <label className="text-sm flex items-center gap-2">
          <input type="checkbox" checked={capture} onChange={e=>setCapture(e.target.checked)} />
          キャプチャリングでハンドラ実行
        </label>
        <label className="text-sm flex items-center gap-2">
          <input type="checkbox" checked={useStop} onChange={e=>setUseStop(e.target.checked)} />
          stopPropagation を有効化
        </label>
      </div>
      <div {...outerProps as any} className="p-4 bg-sky-50 rounded-xl border">
        outer
        <div {...middleProps as any} className="p-4 bg-sky-100 rounded-xl border mt-2">
          middle
          <button {...innerProps as any} className="mt-2 px-3 py-2 rounded-lg border bg-white">inner をクリック</button>
        </div>
      </div>
      <div className="text-xs text-gray-600">右が最新</div>
      <div className="h-28 overflow-auto bg-gray-50 rounded-xl p-2 text-xs border">
        {log.map((l,i)=>(<div key={i}>{l}</div>))}
      </div>
    </div>
  );
}

export function ThisDemo(){
  const [out, setOut] = useState("");

  const run = () => {
    const logs: string[] = [];
    const obj: any = {
      x: 42,
      methodNormal: function(){ logs.push(`normal this.x = ${this.x}`); },
      methodArrow: () => {
        try {
          // @ts-ignore
          logs.push(`arrow this?.x = ${typeof this === "undefined" ? "undefined" : (this && (this as any).x)}`);
        } catch {
          logs.push("arrow this error");
        }
      },
    };
    obj.methodNormal();
    obj.methodArrow();
    const detached = obj.methodNormal;
    try {
      detached();
    } catch (e) {
      logs.push(`detached() error: ${e instanceof Error ? e.message : String(e)}`);
    }
    const bound = obj.methodNormal.bind({ x: 7 });
    bound();
    setOut(logs.join("\n"));
  };

  return (
    <div className="grid gap-2">
      <Button onClick={run}>デモを実行</Button>
      <pre className="bg-gray-50 text-xs p-3 rounded-xl whitespace-pre-wrap border min-h-[64px]">{out}</pre>
      <p className="text-xs text-gray-600 leading-relaxed">
        * Arrow は this を持たず、外側にレキシカル束縛されます。メソッド用途は通常 function を推奨。
      </p>
    </div>
  );
}
