"use client";
import { Card } from "@/components/Card";
import { Challenge } from "@/components/Challenge";
import { useChecklist } from "@/components/progress";

export default function Page(){
  const { mark } = useChecklist();
  return (
    <section>
      <h2 className="text-base font-semibold mb-3">非同期処理</h2>

      <Card title="async/await と fetch(模擬)">
        <Challenge
          id="async_await"
          onPass={()=>mark("async_await")}
          prompt={"mockFetch を await で 1 回呼び、返ってきた data.value を返してください。"}
          starter={`function mockFetch(){
  return new Promise(res=>setTimeout(()=>res({ ok:true, json:()=>({ value: 10 }) }),50))
}

async function run(){
  // const res = await ...
  // const data = await res.json()
  // return { value: data.value }
}

return run()`}
          tests={async (ret)=>{
            if(!ret) return false;
            const r = await ret;
            return r && r.value === 10;
          }}
          solution={`function mockFetch(){
  return new Promise(res=>setTimeout(()=>res({ ok:true, json:()=>({ value: 10 }) }),50))
}

async function run(){
  const res = await mockFetch()
  const data = await res.json()
  return { value: data.value }
}

return run()`}
        />
      </Card>

      <Card title="Promise.all で並列">
        <Challenge
          id="promise_all"
          onPass={()=>mark("promise_all")}
          prompt={"mockApi を 3 回並列で呼び、合計を返してください。"}
          starter={`const mockApi = (v)=> new Promise(res=>setTimeout(()=>res(v), 20))

async function run(){
  // const [a,b,c] = await Promise.all([ ... ])
  // return { total: a+b+c }
}

return run()`}
          tests={async (ret)=>{
            if(!ret) return false;
            const r = await ret;
            return r && r.total === 6;
          }}
          solution={`const mockApi = (v)=> new Promise(res=>setTimeout(()=>res(v), 20))

async function run(){
  const [a,b,c] = await Promise.all([mockApi(1), mockApi(2), mockApi(3)])
  return { total: a+b+c }
}

return run()`}
        />
      </Card>

      <Card title="エラーハンドリング (try/catch)">
        <Challenge
          id="error_handling"
          onPass={()=>mark("error_handling")}
          prompt={"JSON.parse を try/catch で保護し、不正な JSON のとき { error:true } を返してください。"}
          starter={`function safeParse(str){
  // try { ... } catch { return { error: true } }
}

return { ok: safeParse('{"a":1}'), ng: safeParse('{x:}') }`}
          tests={(ret)=> ret && ret.ok.a === 1 && ret.ng.error === true}
          solution={`function safeParse(str){
  try {
    return JSON.parse(str)
  } catch {
    return { error: true }
  }
}
return { ok: safeParse('{"a":1}'), ng: safeParse('{x:}') }`}
        />
      </Card>
    </section>
  );
}
