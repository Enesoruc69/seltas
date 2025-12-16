export default function Loading() {
  return (
    <main className="bg-[#F8F7F4] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16 animate-pulse">
        {/* Breadcrumb + Başlık Skeleton */}
        <div className="mb-10">
          <div className="h-3 w-48 rounded bg-[#E5E3DF] mb-4" />
          <div className="h-3 w-20 rounded bg-[#E5E3DF]" />
          <div className="mt-3 h-8 w-3/4 rounded bg-[#E5E3DF]" />
          <div className="mt-4 h-[1px] w-24 bg-[#E5E3DF]" />

          <div className="mt-5 flex gap-2">
            <div className="h-7 w-24 rounded-full bg-[#E5E3DF]" />
            <div className="h-7 w-16 rounded-full bg-[#E5E3DF]" />
          </div>
        </div>

        {/* Kapak Skeleton */}
        <div className="mb-12 h-[420px] w-full rounded-xl border border-[#E5E3DF] bg-white overflow-hidden">
          <div className="h-full w-full bg-[#E5E3DF]" />
        </div>

        {/* İçerik Skeleton */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Sol */}
          <div className="md:col-span-2 space-y-10">
            <div>
              <div className="h-5 w-40 rounded bg-[#E5E3DF] mb-4" />
              <div className="h-3 w-full rounded bg-[#E5E3DF] mb-2" />
              <div className="h-3 w-11/12 rounded bg-[#E5E3DF] mb-2" />
              <div className="h-3 w-10/12 rounded bg-[#E5E3DF]" />
            </div>

            <div>
              <div className="h-5 w-28 rounded bg-[#E5E3DF] mb-4" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-32 rounded-lg bg-[#E5E3DF]"
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="h-5 w-20 rounded bg-[#E5E3DF] mb-4" />
              <div className="aspect-video w-full rounded-xl bg-[#E5E3DF]" />
            </div>

            <div className="h-10 w-44 rounded bg-[#E5E3DF]" />
          </div>

          {/* Sağ Sticky Kart Skeleton */}
          <aside className="h-fit rounded-xl border border-[#E5E3DF] bg-white p-6 md:sticky md:top-28">
            <div className="h-4 w-40 rounded bg-[#E5E3DF]" />
            <div className="mt-6 space-y-3">
              <div className="h-3 w-3/4 rounded bg-[#E5E3DF]" />
              <div className="h-3 w-2/3 rounded bg-[#E5E3DF]" />
              <div className="h-3 w-1/2 rounded bg-[#E5E3DF]" />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
