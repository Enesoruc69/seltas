"use client";

type Props = {
  videoUrl: string;
  posterUrl?: string;
};

export default function HeroVideo({ videoUrl, posterUrl }: Props) {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-[#F8F7F4]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={videoUrl}
        poster={posterUrl}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />

      {/* Açık overlay */}
      <div className="absolute inset-0 bg-white/70" />

      {/* İçerik */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center px-6">
          <p className="text-xs tracking-[0.35em] text-[#C9A24D]">
            GELENEK • USTALIK • GÜVEN
          </p>

          <h1 className="mt-4 text-3xl md:text-5xl font-light tracking-wide text-[#1C1C1C]">
            Seltaş Yapı & Restorasyon
          </h1>

          <div className="mx-auto my-6 h-[1px] w-24 bg-[#C9A24D]" />

          <p className="text-sm md:text-base text-[#1C1C1C]/80 tracking-wide">
            Cami • Villa • Taş Ev • Restorasyon
          </p>
        </div>
      </div>
    </section>
  );
}
