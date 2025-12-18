"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { Menu, X, Phone, Instagram, Facebook, Youtube} from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    
    <header
    



    
      className={clsx(
        "fixed top-0 left-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/50 backdrop-blur-md shadow-sm h-16"
          : "bg-transparent h-20"
      )}
    >
      <div className="container mx-auto px-6 h-full">
        <nav className="flex h-full items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo1.png"
              alt="logo"
              width={scrolled ? 48 : 64}
              height={scrolled ? 48 : 64}
              className="transition-all duration-300"
              priority
            />
            <span
              className={clsx(
                "md:hidden text-xs tracking-widest font-semibold uppercase transition-colors",
                "text-[#1C1C1C]"
              )}
            >
              Seltaş Yapı & Restorasyon
            </span>

            <div className="hidden md:flex flex-col leading-tight">
              <span
                className={clsx(
                  "text-sm tracking-widest font-semibold uppercase transition-colors",
                  "text-[#1C1C1C]"
                )}
              >
                Seltaş Yapı &
              </span>
              <span
                className={clsx(
                  "text-sm tracking-widest font-semibold uppercase transition-colors",
                  "text-[#1C1C1C]"
                )}
              >
                Restorasyon
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <ul
            className={clsx(
              "hidden md:flex gap-10 text-xs tracking-widest uppercase transition-colors",
              "text-[#1C1C1C]"
            )}
          >
            <li>
              <Link href="/eserler" className="hover:opacity-70 transition">
                Eserler
              </Link>
            </li>
            <li>
              <Link href="/hakkimizda" className="hover:opacity-70 transition">
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link href="/iletisim" className="hover:opacity-70 transition">
                İletişim
              </Link>
            </li>
          </ul>

          {/* MOBİL HAMBURGER */}
          <button
            className="md:hidden text-[#1C1C1C]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>
      </div>

      <div
        className={clsx(
          "md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md transition-all duration-300 overflow-hidden",
          menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="flex flex-col gap-6 px-6 py-6 text-xs tracking-widest uppercase text-[#1C1C1C]">
          <li>
            <Link href="/eserler" onClick={() => setMenuOpen(false)}>
              Eserler
            </Link>
          </li>
          <li>
            <Link href="/hakkimizda" onClick={() => setMenuOpen(false)}>
              Hakkımızda
            </Link>
          </li>
          <li>
            <Link href="/iletisim" onClick={() => setMenuOpen(false)}>
              İletişim
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
