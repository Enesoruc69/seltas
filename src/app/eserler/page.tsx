import EserlerClient from "@/components/eserler/EserlerClient";

type Eser = {
  _id: string;
  baslik: string;
  kategori: string;
  kapakGorseliUrl: string;
  slug: string;
};

async function getEserler(): Promise<Eser[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/eserler`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];
  return res.json();
}

export default async function EserlerPage() {
  const eserler = await getEserler();

  return (
    <main className="bg-[#F8F7F4] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Başlık */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-light text-[#1C1C1C]">
            Eserlerimiz
          </h1>
          <div className="mx-auto my-6 h-[1px] w-24 bg-[#C9A24D]" />
          <p className="text-sm text-[#1C1C1C]/70">
            Tamamladığımız projelerden seçmeler
          </p>
        </div>

        {/* Client filtre + grid */}
        <EserlerClient eserler={eserler} />
      </div>
    </main>
  );
}
