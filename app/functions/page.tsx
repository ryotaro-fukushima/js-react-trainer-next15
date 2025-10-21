"use client";
import { Card } from "@/components/Card";
import { Challenge } from "@/components/Challenge";
import { useChecklist } from "@/components/progress";

export default function Page(){
  const { mark } = useChecklist();
  return (
    <section>
      <h2 className="text-base font-semibold mb-3">関数とコールバック</h2>

      <Card title="クロージャでプライベート変数">
        <Challenge
          id="func_closure"
          onPass={()=>mark("func_closure")}
          prompt={"counter 関数を実装してください。呼び出すと { inc, get } を返し、内部の count は外から直接触れません。"}
          starter={`function counter(){
  // ヒント: 関数内に let count = 0 を定義し、閉じ込める
}

const c = counter()
return { a: c.get(), b: (c.inc(), c.get()) }`}
          tests={(ret)=> ret && ret.a === 0 && ret.b === 1}
          solution={`function counter(){
  let count = 0
  return {
    inc(){ count++ },
    get(){ return count },
  }
}
const c = counter()
return { a: c.get(), b: (c.inc(), c.get()) }`}
        />
      </Card>
    </section>
  );
}
