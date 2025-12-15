import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E3DF] bg-white">
      <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-[#1C1C1C]/70">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-[#1C1C1C] font-light">{site.ad}</div>
            <div className="mt-1">{site.konumKisa}</div>
          </div>

          <div className="text-[#1C1C1C]/70">
            © {new Date().getFullYear()} Seltaş. Tüm hakları saklıdır.
          </div>
        </div>
      </div>
    </footer>
  );
}
