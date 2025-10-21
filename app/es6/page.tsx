"use client";
import { Card } from "@/components/Card";
import { Challenge } from "@/components/Challenge";
import { useChecklist } from "@/components/progress";

export default function Page(){
  const { mark } = useChecklist();
  return (
    <section>
      <h2 className="text-base font-semibold mb-3">ES6+ 構文とモジュール</h2>

      <Card title="分割代入 (destructuring)">
        <Challenge
          id="es6_destructuring"
          onPass={()=>mark("es6_destructuring")}
          prompt={"user から name と age を分割代入で取り出し、同名の変数として定義してください。最後に name と age をオブジェクトで返してください。"}
          starter={`const user = { name: "Taro", age: 20, city: "Tokyo" }
const { /* ここに分割代入 */ } = user

return { name, age }`}
          tests={(ret)=> ret && ret.name === "Taro" && ret.age === 20}
          solution={`const user = { name: "Taro", age: 20, city: "Tokyo" }
const { name, age } = user
return { name, age }`}
        />
      </Card>

      <Card title="デフォルト & 残余(rest) / スプレッド(spread)">
        <Challenge
          id="es6_rest_spread"
          onPass={()=>mark("es6_rest_spread")}
          prompt={"sum 関数を実装してください。可変長引数(...nums)を受け取り、合計を返します。引数なしなら 0。"}
          starter={`function sum(...nums){
  // ここに実装
}

return { out1: sum(1,2,3), out2: sum() }`}
          tests={(ret)=> ret && ret.out1 === 6 && ret.out2 === 0}
          solution={`function sum(...nums){
  if(nums.length === 0) return 0
  return nums.reduce((a,b)=>a+b,0)
}
return { out1: sum(1,2,3), out2: sum() }`}
        />
      </Card>
    </section>
  );
}
