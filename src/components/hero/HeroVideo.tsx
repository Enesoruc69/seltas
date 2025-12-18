"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

/* ---------------- HERO COMPONENT ---------------- */

export default  function HeroVideo({
  videoUrl,
  posterUrl,
}: {
  videoUrl: string;
  posterUrl: string;
}) {
  const router = useRouter();

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-[#F8F7F4]">

      {/* DESKTOP VIDEO */}
      <motion.video
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* MOBILE IMAGE */}
      <motion.img
        src={posterUrl}
        alt="Seltaş Yapı & Restorasyon"
        className="absolute inset-0 block h-full w-full object-cover md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/30 to-white/60" />

      {/* CONTENT */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <motion.div
          className="text-center px-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[10px] md:text-xs tracking-[0.45em] uppercase
                       text-[#B08A3C] drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
          >
            Gelenek • Ustalık • Güven
          </motion.p>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mt-5 text-3xl md:text-5xl font-serif font-medium tracking-wide text-[#1C1C1C]"
          >
            Seltaş Yapı & Restorasyon
          </motion.h1>

          <motion.div
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              visible: { scaleX: 1, opacity: 1 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="origin-left mx-auto my-7 h-[1px] w-24 bg-[#C9A24D]"
          />

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-sm md:text-base text-[#1C1C1C]/80 tracking-wide"
          >
            Cami, Villa ve Taş Yapılarda Aslına Uygun Restorasyon
          </motion.p>
        </motion.div>
      </div>

      {/* HERO CTA */}
      <button
        onClick={() => router.push("/eserler")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2
                   text-[#B08A3C] text-[10px] tracking-widest uppercase
                   drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]
                   hover:opacity-70 transition"
      >
        ESERLERİ KEŞFET
      </button>

      {/* HERO BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-b from-transparent to-[#F8F7F4]" />
    </section>
  );
}

