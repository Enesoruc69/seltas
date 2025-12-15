const hizmetler = [
  { baslik: "Cami Yapı", aciklama: "Geleneksel mimariyle uyumlu, sağlam ve estetik yapılar." },
  { baslik: "Villa", aciklama: "Modern konforu, kaliteli işçilikle birleştiren çözümler." },
  { baslik: "Taş Ev", aciklama: "Doğal malzeme, uzun ömür, ustalıkla işlenmiş detaylar." },
  { baslik: "Restorasyon", aciklama: "Tarihi dokuyu koruyan, uzmanlık gerektiren uygulamalar." },
];

export default function Hizmetler() {
  return (
    <section id="hizmetler" className="bg-[#F8F7F4] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-light text-[#1C1C1C]">
            Hizmetlerimiz
          </h2>
          <div className="mx-auto my-6 h-[1px] w-16 bg-[#C9A24D]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {hizmetler.map((h) => (
            <div
              key={h.baslik}
              className="bg-white border border-[#E5E3DF] p-7 rounded-xl
                         hover:border-[#C9A24D] transition"
            >
              <div className="text-[#C9A24D] text-xs tracking-[0.25em]">HİZMET</div>
              <h3 className="mt-3 text-lg font-light text-[#1C1C1C]">{h.baslik}</h3>
              <p className="mt-3 text-sm text-[#1C1C1C]/75 leading-relaxed">
                {h.aciklama}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
