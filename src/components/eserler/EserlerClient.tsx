"use client";

import { useMemo, useState } from "react";
import EserCard from "@/components/eserler/EserCard";
import EserSkeletonCard from "@/components/eserler/EserSkeletonCard";

type Eser = {
  _id: string;
  baslik: string;
  kategori: string;
  kapakGorseliUrl: string;
  slug: string;
};

const kategoriler = [
  { value: "hepsi", label: "Tümü" },
  { value: "cami", label: "Cami" },
  { value: "villa", label: "Villa" },
  { value: "tas-ev", label: "Taş Ev" },
  { value: "restorasyon", label: "Restorasyon" },
];

const SAYFA_BASI = 6;

export default function EserlerClient({
  eserler,
}: {
  eserler: Eser[] | undefined;
}) {
  const [aktifKategori, setAktifKategori] = useState("hepsi");
  const [aktifSayfa, setAktifSayfa] = useState(1);

  const loading = !eserler || eserler.length === 0;

  /* ---------- FILTRE ---------- */
  const filtreliEserler = useMemo(() => {
    if (!eserler) return [];
    if (aktifKategori === "hepsi") return eserler;
    return eserler.filter((e) => e.kategori === aktifKategori);
  }, [aktifKategori, eserler]);

  /* ---------- PAGINATION ---------- */
  const toplamSayfa = Math.ceil(filtreliEserler.length / SAYFA_BASI);

  const gosterilecekEserler = useMemo(() => {
    const baslangic = (aktifSayfa - 1) * SAYFA_BASI;
    return filtreliEserler.slice(baslangic, baslangic + SAYFA_BASI);
  }, [aktifSayfa, filtreliEserler]);

  return (
    <>
      {/* KATEGORI */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {kategoriler.map((k) => {
          const aktif = aktifKategori === k.value;
          return (
            <button
              key={k.value}
              onClick={() => {
                setAktifKategori(k.value);
                setAktifSayfa(1);
              }}
              className={`
                px-5 py-2 rounded-full text-sm border transition
                ${
                  aktif
                    ? "bg-[#C9A24D] text-white border-[#C9A24D]"
                    : "bg-white text-[#1C1C1C] border-[#E5E3DF] hover:border-[#C9A24D]"
                }
              `}
            >
              {k.label}
            </button>
          );
        })}
      </div>

      {/* GRID */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Array.from({ length: SAYFA_BASI }).map((_, i) => (
            <EserSkeletonCard key={i} />
          ))}
        </div>
      ) : gosterilecekEserler.length === 0 ? (
        <p className="text-center text-[#1C1C1C]/60">
          Bu kategoride eser bulunamadı.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {gosterilecekEserler.map((eser) => (
            <EserCard
              key={eser._id}
              baslik={eser.baslik}
              kategori={eser.kategori}
              kapakGorseliUrl={eser.kapakGorseliUrl}
              slug={eser.slug}
            />
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {!loading && toplamSayfa > 1 && (
        <div className="mt-16 flex justify-center items-center gap-2">
          {Array.from({ length: toplamSayfa }).map((_, i) => {
            const sayfa = i + 1;
            const aktif = aktifSayfa === sayfa;

            return (
              <button
                key={sayfa}
                onClick={() => {
                  setAktifSayfa(sayfa);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`
                  h-10 w-10 rounded-full text-sm transition
                  ${
                    aktif
                      ? "bg-[#C9A24D] text-white"
                      : "border border-[#E5E3DF] text-[#1C1C1C] hover:border-[#C9A24D]"
                  }
                `}
              >
                {sayfa}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
