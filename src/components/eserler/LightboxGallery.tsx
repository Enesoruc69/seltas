"use client";

import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function LightboxGallery({ images }: { images: string[] }) {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    if (index === null) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index]);

  function prev() {
    if (index === null) return;
    setIndex((index - 1 + images.length) % images.length);
  }

  function next() {
    if (index === null) return;
    setIndex((index + 1) % images.length);
  }

  return (
    <>
      {/* GALERİ GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((url, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="group border border-[#E5E3DF] rounded-lg overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt={`Galeri ${i + 1}`}
              className="w-full h-40 object-cover group-hover:scale-105 transition"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* LIGHTBOX */}
      {index !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={() => setIndex(null)}
            className="absolute top-6 right-6 text-white"
          >
            <X size={28} />
          </button>

          {images.length > 1 && (
            <button
              onClick={prev}
              className="absolute left-4 md:left-8 text-white"
            >
              <ChevronLeft size={40} />
            </button>
          )}

          {images.length > 1 && (
            <button
              onClick={next}
              className="absolute right-4 md:right-8 text-white"
            >
              <ChevronRight size={40} />
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[index]}
            alt="Büyük görsel"
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </div>
      )}
    </>
  );
}
