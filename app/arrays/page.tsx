"use client";
import { Card } from "@/components/Card";
import { Challenge } from "@/components/Challenge";
import { useChecklist } from "@/components/progress";

export default function Page(){
  const { mark } = useChecklist();
  return (
    <section>
      <h2 className="text-base font-semibold mb-3">配列メソッド</h2>

      <Card title="map / filter / reduce">
        <Challenge
          id="array_map_filter_reduce"
          onPass={()=>mark("array_map_filter_reduce")}
          prompt={"numbers の偶数だけを取り出して合計を求め、sum を返してください。"}
          starter={`const numbers = [1,2,3,4,5,6]
// ここで filter と reduce を使って sum を計算

return { sum }`}
          tests={(ret)=> ret && ret.sum === 12}
          solution={`const numbers = [1,2,3,4,5,6]
const sum = numbers.filter(n=>n%2===0).reduce((a,b)=>a+b,0)
return { sum }`}
        />
      </Card>

      <Card title="find / findIndex">
        <Challenge
          id="array_find"
          onPass={()=>mark("array_find")}
          prompt={"id=3 の商品の name を見つけて name を返してください。"}
          starter={`const items = [
  { id:1, name:"Pen" },
  { id:2, name:"Note" },
  { id:3, name:"Bag" },
]
// const item = ...

return { name: item && item.name }`}
          tests={(ret)=> ret && ret.name === "Bag"}
          solution={`const items = [
  { id:1, name:"Pen" },
  { id:2, name:"Note" },
  { id:3, name:"Bag" },
]
const item = items.find(x=>x.id===3)
return { name: item && item.name }`}
        />
      </Card>

      <Card title="some / every">
        <Challenge
          id="array_some_every"
          onPass={()=>mark("array_some_every")}
          prompt={"全ての scores が 60 以上なら ok=true を返してください。"}
          starter={`const scores = [72, 88, 91, 67]
// const ok = ...
return { ok }`}
          tests={(ret)=> ret && ret.ok === true}
          solution={`const scores = [72, 88, 91, 67]
const ok = scores.every(x=>x>=60)
return { ok }`}
        />
      </Card>
    </section>
  );
}
