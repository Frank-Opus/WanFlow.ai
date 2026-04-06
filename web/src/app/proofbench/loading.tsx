export default function Loading() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="panel h-20 animate-pulse rounded-full" />
        <div className="panel-strong h-80 animate-pulse rounded-[34px]" />
        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-6">
            <div className="panel h-72 animate-pulse rounded-[32px]" />
            <div className="panel h-[28rem] animate-pulse rounded-[32px]" />
          </div>
          <div className="space-y-6">
            <div className="panel h-[30rem] animate-pulse rounded-[32px]" />
          </div>
        </div>
      </div>
    </main>
  );
}
