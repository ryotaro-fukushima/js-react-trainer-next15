import { expectType, type Equal, type Expect } from "@/lib/type-utils";

export default function Page(){
  // --- 例1: 分割代入の型推論 ---------------------------------
  const user = { id: 1, name: "Taro", age: 20 } as const;
  const { name, age } = user;
  type _UserNameIsString = Expect<Equal<typeof name, "Taro">>; // リテラル型 "Taro"
  type _AgeIs20 = Expect<Equal<typeof age, 20>>;

  // --- 例2: rest/spread の型 ----------------------------------
  function sum(...nums: number[]){
    return nums.reduce((a,b)=>a+b,0);
  }
  expectType<number>(sum(1,2,3));

  // --- 例3: 配列メソッドの型 ----------------------------------
  const items = [{ id:1, name:"Pen" }, { id:2, name:"Note" }] as const;
  const pen = items.find(i => i.id === 1);
  // pen は {id:1; name:"Pen"} | undefined
  type _PenType = Expect<Equal<
    typeof pen,
    { readonly id: 1; readonly name: "Pen" } | undefined
  >>;

  // --- 例4: Promise.all の型 ----------------------------------
  async function run(){
    const [a,b,c] = await Promise.all([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]);
    expectType<number>(a+b+c);
  }
  void run();

  return (
    <section className="grid gap-2">
      <h2 className="text-base font-semibold">型テスト（コンパイル時）</h2>
      <p className="text-sm text-gray-700">
        ここは <code>npm run typecheck</code> で型が崩れていないかを確認するページです。画面上は特に出力しません。
      </p>
      <p className="text-xs text-gray-600">※ エラーを起こしたい場合は、上のコードにわざと型不一致を入れてみてください。</p>
    </section>
  );
}
