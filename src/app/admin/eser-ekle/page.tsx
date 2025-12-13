"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type FormState = {
  baslik: string;
  kategori: string;
  aciklama: string;
  konum: string;
  yil: string; // input string
  kapakGorseliUrl: string;
  galeri: string; // virgülle ayrılmış url string
  youtubeUrl: string;
};

export default function EserEklePage() {
  const router = useRouter();

  const [hazir, setHazir] = useState(false);
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [uploadingKapak, setUploadingKapak] = useState(false);
  const [uploadingGaleri, setUploadingGaleri] = useState(false);

  const [form, setForm] = useState<FormState>({
    baslik: "",
    kategori: "cami",
    aciklama: "",
    konum: "",
    yil: "",
    kapakGorseliUrl: "",
    galeri: "",
    youtubeUrl: "",
  });

  // Admin guard
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    setHazir(true);
  }, [router]);

  // Galeri string -> array (preview için)
  const galeriUrlList = useMemo(() => {
    if (!form.galeri) return [];
    return form.galeri
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
  }, [form.galeri]);

  function urlVideoMu(url: string) {
    return /\/video\/upload\//.test(url) || /\.(mp4|webm|mov)(\?|$)/i.test(url);
  }

  async function uploadFile(file: File) {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    });

    if (!res.ok) {
      let msg = "Upload başarısız";
      try {
        const data = await res.json();
        if (data?.error) msg = data.error;
      } catch {}
      throw new Error(msg);
    }

    const data = await res.json();
    return data.url as string;
  }

  async function kapakSecildi(file: File) {
    const t = toast.loading("Kapak yükleniyor...");
    setUploadingKapak(true);
    try {
      const url = await uploadFile(file);
      setForm((p) => ({ ...p, kapakGorseliUrl: url }));
      toast.success("Kapak yüklendi", { id: t });
    } catch (e: any) {
      toast.error(e?.message || "Kapak yükleme başarısız", { id: t });
    } finally {
      setUploadingKapak(false);
    }
  }

  async function galeriSecildi(files: FileList) {
    const t = toast.loading("Galeri yükleniyor...");
    setUploadingGaleri(true);
    try {
      const arr = Array.from(files);
      const urls = await Promise.all(arr.map(uploadFile));

      setForm((p) => {
        const mevcut = p.galeri ? p.galeri.trim() : "";
        const eklenecek = urls.join(", ");
        return {
          ...p,
          galeri: mevcut ? `${mevcut}, ${eklenecek}` : eklenecek,
        };
      });

      toast.success("Galeri yüklendi", { id: t });
    } catch (e: any) {
      toast.error(e?.message || "Galeri yükleme başarısız", { id: t });
    } finally {
      setUploadingGaleri(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (kaydediliyor) return;

    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    // Basit validasyon
    if (!form.baslik.trim()) {
      toast.error("Başlık zorunlu");
      return;
    }
    if (!form.kapakGorseliUrl.trim()) {
      toast.error("Kapak görseli zorunlu");
      return;
    }

    setKaydediliyor(true);
    const t = toast.loading("Kaydediliyor...");

    try {
      const res = await fetch("/api/eserler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          yil: form.yil ? Number(form.yil) : undefined,
          galeri: form.galeri
            ? form.galeri.split(",").map((x) => x.trim()).filter(Boolean)
            : [],
        }),
      });

      if (!res.ok) {
        let msg = "Ekleme başarısız";
        try {
          const data = await res.json();
          if (data?.mesaj) msg = data.mesaj;
        } catch {}
        throw new Error(msg);
      }

      toast.success("Eser eklendi", { id: t });
      router.push("/admin/eserler");
    } catch (err: any) {
      toast.error(err?.message || "Ekleme başarısız", { id: t });
    } finally {
      setKaydediliyor(false);
    }
  }

  if (!hazir) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-light">Yeni Eser Ekle</h1>
        <button
          onClick={() => router.push("/admin/eserler")}
          className="text-sm text-neutral-300 hover:text-white"
        >
          ← Eserler
        </button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {/* Başlık */}
        <Input
          label="Başlık *"
          value={form.baslik}
          onChange={(e: any) => setForm((p) => ({ ...p, baslik: e.target.value }))}
          placeholder="Örn: Taş Cami Restorasyonu"
        />

        {/* Kategori */}
        <Select
          label="Kategori"
          value={form.kategori}
          onChange={(e: any) => setForm((p) => ({ ...p, kategori: e.target.value }))}
          options={[
            { value: "cami", label: "Cami" },
            { value: "villa", label: "Villa" },
            { value: "tas-ev", label: "Taş Ev" },
            { value: "restorasyon", label: "Restorasyon" },
          ]}
        />

        {/* Açıklama */}
        <Textarea
          label="Açıklama"
          value={form.aciklama}
          onChange={(e: any) =>
            setForm((p) => ({ ...p, aciklama: e.target.value }))
          }
          placeholder="Eser hakkında kısa açıklama..."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Konum"
            value={form.konum}
            onChange={(e: any) => setForm((p) => ({ ...p, konum: e.target.value }))}
            placeholder="Örn: Erzurum"
          />
          <Input
            label="Yıl"
            value={form.yil}
            onChange={(e: any) => setForm((p) => ({ ...p, yil: e.target.value }))}
            placeholder="Örn: 2025"
            inputMode="numeric"
          />
          <Input
            label="YouTube URL (opsiyonel)"
            value={form.youtubeUrl}
            onChange={(e: any) =>
              setForm((p) => ({ ...p, youtubeUrl: e.target.value }))
            }
            placeholder="https://youtube.com/..."
          />
        </div>

        {/* Kapak Upload */}
        <div className="space-y-2">
          <label className="block text-sm text-neutral-400">Kapak Görseli / Video *</label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              void kapakSecildi(file);
              // aynı dosyayı tekrar seçebilmek için
              e.currentTarget.value = "";
            }}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2"
          />
          <div className="text-xs text-neutral-500">
            {uploadingKapak ? "Kapak yükleniyor..." : "Kapak dosyası seçebilirsin (foto/video)."}
          </div>

          {form.kapakGorseliUrl && (
            <div className="border border-neutral-800 rounded-lg overflow-hidden">
              {urlVideoMu(form.kapakGorseliUrl) ? (
                <video
                  src={form.kapakGorseliUrl}
                  controls
                  playsInline
                  className="w-full max-h-[360px] object-cover bg-black"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.kapakGorseliUrl}
                  alt="Kapak önizleme"
                  className="w-full max-h-[360px] object-cover"
                />
              )}
              <div className="p-3 bg-neutral-900 text-xs text-neutral-400 break-all">
                {form.kapakGorseliUrl}
              </div>
            </div>
          )}
        </div>

        {/* Galeri Upload */}
        <div className="space-y-2">
          <label className="block text-sm text-neutral-400">Galeri (çoklu foto – opsiyonel)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = e.target.files;
              if (!files || files.length === 0) return;
              void galeriSecildi(files);
              e.currentTarget.value = "";
            }}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2"
          />
          <div className="text-xs text-neutral-500">
            {uploadingGaleri ? "Galeri yükleniyor..." : "Birden fazla foto seçebilirsin."}
          </div>

          {galeriUrlList.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {galeriUrlList.slice(0, 8).map((url, i) => (
                <div
                  key={`${url}-${i}`}
                  className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-900"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`Galeri ${i + 1}`} className="w-full h-28 object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* İstersen manuel düzenleme için textarea bırakıyorum */}
          <Textarea
            label="Galeri URL (virgülle ayır)"
            value={form.galeri}
            onChange={(e: any) => setForm((p) => ({ ...p, galeri: e.target.value }))}
            placeholder="https://... , https://..."
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={kaydediliyor || uploadingKapak || uploadingGaleri}
            className="bg-white text-black px-6 py-2 rounded-md hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {kaydediliyor ? "Kaydediliyor..." : "Kaydet"}
          </button>

          <span className="text-xs text-neutral-500">
            {uploadingKapak || uploadingGaleri
              ? "Yükleme bitmeden kaydetme devre dışı."
              : "Kapak zorunlu, YouTube opsiyonel."}
          </span>
        </div>
      </form>
    </div>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm text-neutral-400 mb-1">{label}</label>
      <input
        {...props}
        className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2 outline-none focus:border-neutral-600"
      />
    </div>
  );
}

function Textarea({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm text-neutral-400 mb-1">{label}</label>
      <textarea
        {...props}
        rows={4}
        className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2 outline-none focus:border-neutral-600"
      />
    </div>
  );
}

function Select({
  label,
  options,
  ...props
}: {
  label: string;
  options: Array<{ value: string; label: string }>;
  [k: string]: any;
}) {
  return (
    <div>
      <label className="block text-sm text-neutral-400 mb-1">{label}</label>
      <select
        {...props}
        className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2 outline-none focus:border-neutral-600"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
