"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

type FormState = {
  baslik: string;
  kategori: string;
  aciklama: string;
  konum: string;
  yil: string;
  kapakGorseliUrl: string;
  galeri: string; // virgülle ayrılmış
  youtubeUrl: string;
};

export default function EserDuzenlePage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  // Admin guard + veri çek
  useEffect(() => {
    if (!id) return;

    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    async function fetchEser() {
      try {
        const res = await fetch(`/api/eserler/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error();

        const data = await res.json();
        setForm({
          baslik: data.baslik || "",
          kategori: data.kategori || "cami",
          aciklama: data.aciklama || "",
          konum: data.konum || "",
          yil: data.yil ? String(data.yil) : "",
          kapakGorseliUrl: data.kapakGorseliUrl || "",
          galeri: data.galeri ? data.galeri.join(", ") : "",
          youtubeUrl: data.youtubeUrl || "",
        });
      } catch {
        toast.error("Eser yüklenemedi");
      } finally {
        setLoading(false);
      }
    }

    fetchEser();
  }, [id, router]);

  const galeriUrlList = useMemo(() => {
    if (!form.galeri) return [];
    return form.galeri.split(",").map((x) => x.trim()).filter(Boolean);
  }, [form.galeri]);

  function urlVideoMu(url: string) {
    return /\/video\/upload\//.test(url) || /\.(mp4|webm|mov)(\?|$)/i.test(url);
  }

  async function uploadFile(file: File) {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (!res.ok) throw new Error("Upload başarısız");
    const data = await res.json();
    return data.url as string;
  }

  async function kapakSecildi(file: File) {
    const t = toast.loading("Kapak yükleniyor...");
    setUploadingKapak(true);
    try {
      const url = await uploadFile(file);
      setForm((p) => ({ ...p, kapakGorseliUrl: url }));
      toast.success("Kapak güncellendi", { id: t });
    } catch {
      toast.error("Kapak yüklenemedi", { id: t });
    } finally {
      setUploadingKapak(false);
    }
  }

  async function galeriSecildi(files: FileList) {
    const t = toast.loading("Galeri yükleniyor...");
    setUploadingGaleri(true);
    try {
      const urls = await Promise.all(Array.from(files).map(uploadFile));
      setForm((p) => ({
        ...p,
        galeri: p.galeri
          ? `${p.galeri}, ${urls.join(", ")}`
          : urls.join(", "),
      }));
      toast.success("Galeriye eklendi", { id: t });
    } catch {
      toast.error("Galeri yüklenemedi", { id: t });
    } finally {
      setUploadingGaleri(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;

    const token = localStorage.getItem("admin_token");
    if (!token) return;

    setSaving(true);
    const t = toast.loading("Güncelleniyor...");

    try {
      const res = await fetch(`/api/eserler/${id}`, {
        method: "PUT",
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

      if (!res.ok) throw new Error();
      toast.success("Eser güncellendi", { id: t });
      router.push("/admin/eserler");
    } catch {
      toast.error("Güncelleme başarısız", { id: t });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-light">Eser Düzenle</h1>
        <button
          onClick={() => router.push("/admin/eserler")}
          className="text-sm text-neutral-300 hover:text-white"
        >
          ← Eserler
        </button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <Input label="Başlık" value={form.baslik} onChange={(e:any)=>setForm(p=>({...p,baslik:e.target.value}))} />
        <Textarea label="Açıklama" value={form.aciklama} onChange={(e:any)=>setForm(p=>({...p,aciklama:e.target.value}))} />

        {/* Kapak */}
        <div className="space-y-2">
          <label className="block text-sm text-neutral-400">Kapak</label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void kapakSecildi(f);
              e.currentTarget.value = "";
            }}
          />
          {form.kapakGorseliUrl && (
            urlVideoMu(form.kapakGorseliUrl) ? (
              <video src={form.kapakGorseliUrl} controls className="w-full max-h-72" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.kapakGorseliUrl} className="w-full max-h-72 object-cover" />
            )
          )}
        </div>

        {/* Galeri */}
        <div className="space-y-2">
          <label className="block text-sm text-neutral-400">Galeri</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              if (e.target.files) void galeriSecildi(e.target.files);
              e.currentTarget.value = "";
            }}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {galeriUrlList.map((u, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={u} className="h-28 w-full object-cover rounded" />
            ))}
          </div>
        </div>

        <button
          disabled={saving || uploadingKapak || uploadingGaleri}
          className="bg-white text-black px-6 py-2 rounded-md disabled:opacity-50"
        >
          {saving ? "Kaydediliyor..." : "Güncelle"}
        </button>
      </form>
    </div>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm text-neutral-400 mb-1">{label}</label>
      <input {...props} className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2" />
    </div>
  );
}

function Textarea({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm text-neutral-400 mb-1">{label}</label>
      <textarea {...props} rows={4} className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2" />
    </div>
  );
}
