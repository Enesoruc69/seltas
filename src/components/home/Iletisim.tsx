import { Phone, MapPin } from "lucide-react";
import { site } from "@/lib/site";

export default function Iletisim() {
  return (
    <section id="iletisim" className="bg-[#F8F7F4] py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="w-full h-[340px] border border-[#E5E3DF] rounded-xl overflow-hidden bg-white">
          <iframe
            src={site.mapsEmbedUrl}
            className="w-full h-full"
            loading="lazy"
          />
        </div>

        <div className="bg-white border border-[#E5E3DF] rounded-xl p-8">
          <h3 className="text-2xl font-light text-[#1C1C1C]">
            İletişim & Konum
          </h3>
          <div className="mt-4 h-[1px] w-16 bg-[#C9A24D]" />

          <div className="mt-6 space-y-4 text-[#1C1C1C]/80 text-sm">
            <div className="flex items-center gap-3">
              <MapPin className="text-[#C9A24D]" />
              <span>{site.adres}</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-[#C9A24D]" />
              <a className="hover:underline" href={site.telefonHref}>
                {site.telefon}
              </a>
            </div>
          </div>

          <p className="mt-6 text-xs text-[#1C1C1C]/60">
            * Proje keşif ve detaylı bilgi için bizimle iletişime geçebilirsiniz.
          </p>
        </div>
      </div>
    </section>
  );
}
