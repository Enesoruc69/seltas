import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#F8F7F4]/80 backdrop-blur border-b border-[#E5E3DF]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="tracking-wide font-light">
          <span className="text-[#1C1C1C]">Seltaş</span>{" "}
          <span className="text-[#C9A24D]">Yapı</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link className="hover:text-[#C9A24D] transition" href="/#hakkimizda">
            Hakkımızda
          </Link>
          <Link className="hover:text-[#C9A24D] transition" href="/#hizmetler">
            Hizmetler
          </Link>
          <Link className="hover:text-[#C9A24D] transition" href="/#iletisim">
            İletişim
          </Link>
          <Link
            className="px-4 py-2 rounded-md border border-[#C9A24D] text-[#C9A24D] hover:bg-[#C9A24D] hover:text-white transition"
            href="/eserler"
          >
            Eserlerimiz
          </Link>
        </nav>
      </div>
    </header>
  );
}
