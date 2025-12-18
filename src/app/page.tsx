import Link from "next/link";
import HeroVideo from "@/components/hero/HeroVideo";
import Hakkimizda from "@/components/home/Hakkimizda";
import Hizmetler from "@/components/home/Hizmetler";
import Iletisim from "@/components/home/Iletisim";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <main className="overflow-hidden">
    
       {/* HERO */}
          <HeroVideo
            videoUrl="/videos/hero.mp4"
            posterUrl="/images/hero-mobile.jpg"
          />

      {/* CTA BAND */}
      <section className="bg-[#F8F7F4] py-24 text-center">
        <div className="container mx-auto px-6">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#B08A3C]">
            Portföy
          </p>

          <h2 className="mt-5 text-2xl md:text-3xl font-serif text-[#1C1C1C]">
            Tamamlanan Restorasyon Projelerimizi İnceleyin
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm text-[#1C1C1C]/70">
            Cami, villa ve taş yapılarda aslına uygun restorasyon anlayışımızı
            yansıtan projelerimizi keşfedin.
          </p>

          <Link
            href="/eserler"
            className="mt-10 inline-block border border-[#B08A3C]
                       px-10 py-4 text-[10px] tracking-widest uppercase
                       text-[#B08A3C]
                       hover:bg-[#B08A3C] hover:text-white transition"
          >
            Eserler Sayfasına Git
          </Link>
        </div>
      </section>

      {/* HOME SECTIONS */}
      <Hakkimizda />
      <Hizmetler />
      <Iletisim />
    </main>
  );
}
