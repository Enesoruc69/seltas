import Link from "next/link";

type Props = {
  baslik: string;
  kategori: string;
  kapakGorseliUrl: string;
  slug: string;
};

export default function EserCard({
  baslik,
  kategori,
  kapakGorseliUrl,
  slug,
}: Props) {
  return (
    <Link
      href={`/eserler/${slug}`}
      className="group bg-white border border-[#E5E3DF] rounded-xl overflow-hidden hover:border-[#C9A24D] transition"
      
    >
      <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}

        <img
          src={kapakGorseliUrl}
          alt={baslik}
          className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      <div className="p-4">
        <p className="text-xs tracking-widest text-[#C9A24D] uppercase">
          {kategori}
        </p>
        <h3 className="mt-1 text-[#1C1C1C] font-light">
          {baslik}
        </h3>
      </div>
    </Link>
  );
}
