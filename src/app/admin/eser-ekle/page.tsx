"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EserEklePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [mesaj, setMesaj] = useState("");

  const [form, setForm] = useState({
    baslik: "",
    kategori: "cami",
    aciklama: "",
    konum: "",
    yil: "",
    kapakGorseliUrl: "",
    galeri: "",
    youtubeUrl: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMesaj("");

    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    try {
      const res = await fetch("/api/eserler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          baslik: form.baslik,
          kategori: form.kategori,
          aciklama: form.aciklama,
          konum: form.konum,
          yil: form.yil ? Number(form.yil) : undefined,
          kapakGorseliUrl: form.kapakGorseliUrl,
          galeri: form.galeri
            ? form.galeri.split(",").map((x) => x.trim())
            : [],
          youtubeUrl: form.youtubeUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.mesaj || "Kayıt başarısız");
      }

      setMesaj("✅ Eser başarıyla eklendi");
      setForm({
        baslik: "",
        kategori: "cami",
        aciklama: "",
        konum: "",
        yil: "",
        kapakGorseliUrl: "",
        galeri: "",
        youtubeUrl: "",
      });
    } catch (err: any) {
      setMesaj("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-10">
      <h1 className="text-2xl font-light mb-8">Yeni Eser Ekle</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
        <Input label="Başlık" name="baslik" value={form.baslik} onChange={handleChange} />
        
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Kategori</label>
          <select
            name="kategori"
            value={form.kategori}
            onChange={handleChange}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-4 py-2"
          >
            <option value="cami">Cami</option>
            <option value="villa">Villa</option>
            <option value="tas-ev">Taş Ev</option>
            <option value="restorasyon">Restorasyon</option>
          </select>
        </div>

        <Textarea label="Açıklama" name="aciklama" value={form.aciklama} onChange={handleChange} />
        <Input label="Konum" name="konum" value={form.konum} onChange={handleChange} />
        <Input label="Yıl" name="yil" value={form.yil} onChange={handleChange} />
        <Input label="Kapak Görsel URL" name="kapakGorseliUrl" value={form.kapakGorseliUrl} onChange={handleChange} />
        <Input label="Galeri (virgülle ayır)" name="galeri" value={form.galeri} onChange={handleChange} />
        <Input label="YouTube URL (opsiyonel)" name="youtubeUrl" value={form.youtubeUrl} onChange={handleChange} />

        {mesaj && <p className="text-sm">{mesaj}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-white text-black px-6 py-2 rounded-md hover:bg-neutral-200 disabled:opacity-50"
        >
          {loading ? "Kaydediliyor..." : "Kaydet"}
        </button>
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
        className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-4 py-2"
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
        className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-4 py-2"
      />
    </div>
  );
}
