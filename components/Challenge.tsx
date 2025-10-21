"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/Card";

type Tests = (returned: any) => boolean | Promise<boolean>;

export function Challenge(props: {
  id: string;
  prompt: string;
  starter: string;
  tests: Tests;
  solution: string;
  onPass?: () => void;
}) {
  const { id, prompt, starter, tests, solution, onPass } = props;
  const [code, setCode] = useState<string>(starter);
  const [result, setResult] = useState<boolean | null>(null);
  const [error, setError] = useState<string>("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`trainer:code:${id}`);
    if (saved) setCode(saved);
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`trainer:code:${id}`, code);
  }, [id, code]);

  const runTests = () => {
    setError("");
    setResult(null);
    try {
      const sandbox = { console, setTimeout, clearTimeout, Promise };
      const keys = Object.keys(sandbox);
      const values = Object.values(sandbox);
      // eslint-disable-next-line no-new-func
      const fn = new Function(...keys, `${code}; return { ...this };`);
      const returned = fn.apply({}, values);
      Promise.resolve(tests(returned))
        .then((ok) => {
          setResult(!!ok);
          if (ok && onPass) onPass();
        })
        .catch((e: any) => setError(String(e?.message ?? e)));
    } catch (e: any) {
      setError(String(e?.message ?? e));
    }
  };

  return (
    <div className="grid gap-3">
      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{prompt}</p>
      <textarea
        className="w-full min-h-[140px] font-mono text-sm p-3 rounded-xl border"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <div className="flex gap-2 items-center">
        <Button onClick={runTests}>テストを実行</Button>
        <Button onClick={() => setShow((s) => !s)}>{show ? "模範解答を隠す" : "模範解答を表示"}</Button>
      </div>
      {result === true && <div className="text-green-700 text-sm">✅ 合格！</div>}
      {result === false && <div className="text-red-700 text-sm">❌ 失敗。ヒント: 条件や戻り値を見直そう。</div>}
      {error && <pre className="bg-red-50 text-red-700 text-xs p-3 rounded-xl whitespace-pre-wrap">{error}</pre>}
      {show && <pre className="bg-gray-50 text-xs p-3 rounded-xl whitespace-pre-wrap border">{solution}</pre>}
    </div>
  );
}
