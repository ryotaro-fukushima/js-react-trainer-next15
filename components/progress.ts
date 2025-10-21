"use client";
import { useEffect, useMemo, useState } from "react";

export const ALL_KEYS = [
  "es6_destructuring",
  "es6_rest_spread",
  "func_closure",
  "array_map_filter_reduce",
  "array_find",
  "array_some_every",
  "obj_ops",
  "async_await",
  "promise_all",
  "error_handling",
  "events_prevent_stop",
  "events_bub_cap",
  "arrow_vs_this",
] as const;
export type Key = typeof ALL_KEYS[number];

export function useChecklist(){
  const [done, setDone] = useState<Record<string, boolean>>({});
  useEffect(()=>{
    const raw = localStorage.getItem("trainer:checklist");
    setDone(raw ? JSON.parse(raw) : {});
  },[]);
  useEffect(()=>{
    localStorage.setItem("trainer:checklist", JSON.stringify(done));
  },[done]);
  const mark = (k: Key) => setDone(d => ({...d, [k]: true}));
  const reset = () => setDone({});
  const progress = useMemo(()=>{
    const total = ALL_KEYS.length;
    const c = ALL_KEYS.filter(k => done[k]).length;
    return { c, total, pct: Math.round((c/total)*100) };
  }, [done]);
  return { done, mark, reset, progress };
}