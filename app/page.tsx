"use client";
import { ALL_KEYS, useChecklist } from "@/components/progress";

export default function Page(){
  const { done, reset, progress } = useChecklist();
  return (
    <div className="grid md:grid-cols-[1fr_320px] gap-6">
      <section>
        <h2 className="text-base font-semibold mb-3">ようこそ</h2>
        <p className="text-sm text-gray-700 mb-3">
          右上のナビから各テーマへ。課題はローカルに保存され、チェックリストで進捗が可視化されます。
        </p>
      </section>
      <aside>
        <div className="rounded-2xl border bg-white p-5 sticky top-[72px]">
          <h3 className="font-semibold mb-2">進捗</h3>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-36 bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="h-2 bg-black/70" style={{width: `${progress.pct}%`}} />
            </div>
            <span className="text-sm">{progress.c}/{progress.total}</span>
            <button onClick={reset} className="text-xs underline">リセット</button>
          </div>
          <ul className="text-sm grid gap-1 max-h-[300px] overflow-auto">
            {ALL_KEYS.map(k => (
              <li key={k} className="flex items-center gap-2">
                <input type="checkbox" checked={!!done[k]} readOnly />
                <span className="truncate">{k.replace(/_/g, " → ")}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
