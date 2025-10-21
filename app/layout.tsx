import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "JS/React Daily Trainer",
  description: "Next.js 15 App Router + TypeScript 学習アプリ",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
        <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="text-xl font-bold">毎日使うJS/Reactトレーナー</a>
            <nav className="text-sm">
              <a className="px-2" href="/es6">ES6+</a>
              <a className="px-2" href="/functions">関数</a>
              <a className="px-2" href="/arrays">配列</a>
              <a className="px-2" href="/objects">オブジェクト</a>
              <a className="px-2" href="/async">非同期</a>
              <a className="px-2" href="/events">イベント</a>
              <a className="px-2" href="/this">this</a>
              <a className="px-2" href="/types">型テスト</a>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
