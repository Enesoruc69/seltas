"use client";

import { useMemo, useState } from "react";
import EserCard from "@/components/eserler/EserCard";

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

export default function EserlerClient({ eserler }: { eserler: Eser[] }) {
  const [aktifKategori, setAktifKategori] = useState("hepsi");

  const filtreliEserler = useMemo(() => {
    if (aktifKategori === "hepsi") return eserler;
    return eserler.filter((e) => e.kategori === aktifKategori);
  }, [aktifKategori, eserler]);

  return (
    <>
      {/* Filtre */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {kategoriler.map((k) => {
          const aktif = aktifKategori === k.value;
          return (
            <button
              key={k.value}
              onClick={() => setAktifKategori(k.value)}
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

      {/* Grid */}
      {filtreliEserler.length === 0 ? (
        <p className="text-center text-[#1C1C1C]/60">
          Bu kategoride eser bulunamadı.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filtreliEserler.map((eser) => (
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
    </>
  );
}
