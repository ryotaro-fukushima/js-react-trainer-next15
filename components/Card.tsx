export function Card({ title, done, children }: { title: string; done?: boolean; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl shadow p-5 bg-white border mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {done ? <span className="text-xs px-2 py-1 rounded-full bg-green-100">done</span> : null}
      </div>
      {children}
    </div>
  );
}

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", ...rest } = props;
  return (
    <button
      {...rest}
      className={"px-3 py-2 rounded-xl shadow border text-sm hover:shadow-md active:scale-[.99] " + className}
    />
  );
}