import { notFound } from "next/navigation";
import LightboxGallery from "@/components/eserler/LightboxGallery";


/* ---------------- TYPES ---------------- */

type Eser = {
  _id: string;
  baslik: string;
  slug?: string;
  kategori: string;
  aciklama?: string;
  konum?: string;
  yil?: number;
  kapakGorseliUrl: string;
  kapakPosterUrl?: string;
  galeri?: string[];
  youtubeUrl?: string;
};

/* ---------------- HELPERS ---------------- */

function urlVideoMu(url: string) {
  return /\/video\/upload\//.test(url) || /\.(mp4|webm|mov)(\?|$)/i.test(url);
}

async function getEser(slug: string): Promise<Eser | null> {
  if (typeof slug !== "string" || !slug.trim()) return null;

  const res = await fetch("http://localhost:3000/api/eserler", {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const eserler: Eser[] = await res.json();
  const slugLower = slug.toLowerCase();

  return (
    eserler.find(
      (e) =>
        typeof e.slug === "string" &&
        e.slug.toLowerCase() === slugLower
    ) ?? null
  );
}

/* ---------------- PAGE ---------------- */

export default async function EserDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ Next.js 15 uyumlu
  const { slug } = await params;

  const eser = await getEser(slug);

  if (!eser) {
    notFound();
  }

  return (
    <main className="bg-[#F8F7F4] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* BAŞLIK */}
        <div className="mb-10">
          <p className="text-xs tracking-widest text-[#C9A24D] uppercase">
            {eser.kategori}
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-light text-[#1C1C1C]">
            {eser.baslik}
          </h1>
          <div className="mt-4 h-[1px] w-24 bg-[#C9A24D]" />
        </div>

        {/* KAPAK */}
        <div className="mb-12 border border-[#E5E3DF] rounded-xl overflow-hidden bg-white">
          {urlVideoMu(eser.kapakGorseliUrl) ? (
            <video
              src={eser.kapakGorseliUrl}
              poster={eser.kapakPosterUrl}
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
            />
          )}
        </div>

        {/* İÇERİK */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* SOL */}
          <div className="md:col-span-2 space-y-8">
            {eser.aciklama && (
              <p className="text-[#1C1C1C]/80 leading-relaxed">
                {eser.aciklama}
              </p>
            )}

          {/* GALERİ */}
{eser.galeri && eser.galeri.length > 0 && (
  <div>
    <h2 className="text-lg font-light mb-4">Galeri</h2>
    <LightboxGallery images={eser.galeri} />
  </div>
)}


            {/* YOUTUBE */}
            {eser.youtubeUrl && (
              <div>
                <h2 className="text-lg font-light mb-4">Video</h2>
                <div className="aspect-video">
                  <iframe
                    src={eser.youtubeUrl.replace("watch?v=", "embed/")}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>

          {/* SAĞ */}
          <aside className="bg-white border border-[#E5E3DF] rounded-xl p-6 h-fit">
            <h3 className="text-sm tracking-widest text-[#C9A24D] uppercase">
              Proje Bilgileri
            </h3>

            <div className="mt-6 space-y-3 text-sm text-[#1C1C1C]/80">
              {eser.konum && (
                <div>
                  <span className="font-medium">Konum:</span> {eser.konum}
                </div>
              )}
              {eser.yil && (
                <div>
                  <span className="font-medium">Yıl:</span> {eser.yil}
                </div>
              )}
              <div>
                <span className="font-medium">Kategori:</span>{" "}
                {eser.kategori}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}
