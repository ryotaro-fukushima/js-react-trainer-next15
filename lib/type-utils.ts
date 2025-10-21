// 型テスト用の小さなユーティリティ。コンパイル時のみ効く。
export type Expect<T extends true> = T;
export type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? true : false;

// 値レベルでも使える no-op。型チェックのための足場。
export function expectType<T>(value: T){ return value as T; }
