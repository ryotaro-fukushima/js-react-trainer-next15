"use client";
import { Card } from "@/components/Card";
import { Challenge } from "@/components/Challenge";
import { useChecklist } from "@/components/progress";

export default function Page(){
  const { mark } = useChecklist();
  return (
    <section>
      <h2 className="text-base font-semibold mb-3">オブジェクト操作</h2>

      <Card title="作成/更新/マージ/存在チェック/繰り返し">
        <Challenge
          id="obj_ops"
          onPass={()=>mark("obj_ops")}
          prompt={"user と extra をスプレッドでマージし、city を削除して keys の数を返してください（hasOwnProperty と Object.keys を使う）。"}
          starter={`const user = { id: 1, name: "Taro", city: "Tokyo" }
const extra = { age: 20 }
// const merged = { ... }
// delete merged.city
// const count = Object.keys(merged).length

return { hasName: user.hasOwnProperty('name'), count }`}
          tests={(ret)=> ret && ret.hasName === true && ret.count === 3}
          solution={`const user = { id: 1, name: "Taro", city: "Tokyo" }
const extra = { age: 20 }
const merged = { ...user, ...extra }
delete merged.city
const count = Object.keys(merged).length
return { hasName: user.hasOwnProperty('name'), count }`}
        />
      </Card>
    </section>
  );
}
