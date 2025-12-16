"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6">
        <nav className="flex h-20 items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={44}
              height={44}
              priority
            />
            <span
              className={clsx(
                "text-sm tracking-widest uppercase transition-colors",
                scrolled ? "text-[#1C1C1C]" : "text-white"
              )}
            >
              Seltaş
            </span>
          </Link>

          {/* MENU */}
          <ul
            className={clsx(
              "flex gap-10 text-xs tracking-widest uppercase transition-colors",
              scrolled ? "text-[#1C1C1C]" : "text-black"
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

        </nav>
      </div>
    </header>
  );
}
