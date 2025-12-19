import Link from "next/link";
import { notFound } from "next/navigation";
import LightboxGallery from "@/components/eserler/LightboxGallery";
import { youtubeEmbedUrl } from "@/lib/youtube";

type Eser = {
  _id: string;
  baslik: string;
  slug: string;
  kategori: string;
  aciklama?: string;
  konum?: string;
  yil?: number;
  kapakGorseliUrl: string;
  detayVideoUrl?: string;
  galeri?: string[];
  youtubeUrl?: string;
};

async function getEser(slug: string): Promise<Eser | null> {
  const res = await fetch("http://localhost:3000/api/eserler", {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const eserler: Eser[] = await res.json();
  return eserler.find((e) => e.slug === slug) ?? null;
}

export default async function EserDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug || typeof slug !== "string") notFound();

  const eser = await getEser(slug);
  if (!eser) notFound();

const embedUrl = eser.youtubeUrl
  ? youtubeEmbedUrl(eser.youtubeUrl)
  : null;

  const temizGaleri =
    eser.galeri?.filter(
      (url) => typeof url === "string" && url.startsWith("http")
    ) || [];

  return (
    <main className="bg-[#F8F7F4] min-h-screen  ">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Breadcrumb + Başlık */}
        <div className="mb-10">
          <div className="mb-4 text-[11px] tracking-widest text-[#1C1C1C]/60">
            <Link href="/eserler" className="hover:text-[#1C1C1C] transition">
              ESERLER
            </Link>
            <span className="mx-2">/</span>
            <span className="uppercase">{eser.kategori}</span>
          </div>

          <p className="text-xs tracking-widest text-[#C9A24D] uppercase">
            {eser.kategori}
          </p>

          <h1 className="mt-2 text-3xl md:text-4xl font-light text-[#1C1C1C]">
            {eser.baslik}
          </h1>

          <div className="mt-4 h-[1px] w-24 bg-[#C9A24D]" />

          {/* Meta satırı */}
          <div className="mt-5 flex flex-wrap gap-2 text-xs text-[#1C1C1C]/70">
            {eser.konum && (
              <span className="rounded-full border border-[#E5E3DF] bg-white px-3 py-1">
                {eser.konum}
              </span>
            )}
            {eser.yil && (
              <span className="rounded-full border border-[#E5E3DF] bg-white px-3 py-1">
                {eser.yil}
              </span>
            )}
          </div>
        </div>

        {/* Kapak / Detay Video */}
        <div className="mb-12 border border-[#E5E3DF] rounded-xl overflow-hidden bg-white">
          {eser.detayVideoUrl ? (
            <video
              src={eser.detayVideoUrl}
              controls
              playsInline
              className="w-full max-h-[520px] object-cover bg-black"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={eser.kapakGorseliUrl}
              alt={eser.baslik}
              className="w-full max-h-[520px] object-cover"
              loading="eager"
            />
          )}
        </div>

        {/* İçerik */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Sol içerik */}
          <div className="md:col-span-2 space-y-10">
            {eser.aciklama && (
              <section>
                <h2 className="text-lg font-light mb-3 text-[#1C1C1C]">
                  Proje Hakkında
                </h2>
                <p className="text-[#1C1C1C]/80 leading-relaxed">
                  {eser.aciklama}
                </p>
              </section>
            )}

            {/* Galeri */}
            {temizGaleri.length > 0 && (
              <section>
                <h2 className="text-lg font-light mb-4 text-[#1C1C1C]">
                  Galeri
                </h2>
                <LightboxGallery images={temizGaleri} />
              </section>
            )}

            {/* YouTube */}
            {embedUrl && (
              <section>
                <h2 className="text-lg font-light mb-4 text-[#1C1C1C]">
                  Detaylı Video
                </h2>
                <div className="aspect-video w-full rounded-xl overflow-hidden border border-[#E5E3DF] bg-black">
                  <iframe
                    src={embedUrl}
                    title="YouTube Video"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </section>
            )}

            {/* Alt CTA */}
            <div className="pt-2">
              <Link
                href="/eserler"
                className="inline-block border border-[#C9A24D] px-8 py-3 text-[10px] tracking-widest uppercase text-[#C9A24D] hover:bg-[#C9A24D] hover:text-white transition"
              >
                Tüm Eserlere Dön
              </Link>
            </div>
          </div>

          {/* Sağ: Proje Bilgileri (Sticky) */}
          <aside className="bg-white border border-[#E5E3DF] rounded-xl p-6 h-fit md:sticky md:top-28">
            <h3 className="text-sm tracking-widest text-[#C9A24D] uppercase">
              Proje Bilgileri
            </h3>

            <div className="mt-6 space-y-3 text-sm text-[#1C1C1C]/80">
              {eser.konum && (
                <div>
                  <span className="font-medium text-[#1C1C1C]">Konum:</span>{" "}
                  {eser.konum}
                </div>
              )}
              {eser.yil && (
                <div>
                  <span className="font-medium text-[#1C1C1C]">Yıl:</span>{" "}
                  {eser.yil}
                </div>
              )}
              <div>
                <span className="font-medium text-[#1C1C1C]">Kategori:</span>{" "}
                {eser.kategori}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
