"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

export type FormState = {
  baslik: string;
  kategori: string;
  aciklama: string;
  konum: string;
  yil: string;
  kapakGorseliUrl: string;
  galeri: string;
  youtubeUrl: string;
  detayVideoUrl: string;
};

type Props = {
  mode: "create" | "edit";
  initialData?: Partial<FormState>;
  submitLabel: string;
  onSubmit: (data: FormState) => Promise<void>;
};

export default function EserForm({
  mode,
  initialData,
  submitLabel,
  onSubmit,
}: Props) {
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<FormState>({
    baslik: "",
    kategori: "cami",
    aciklama: "",
    konum: "",
    yil: "",
    kapakGorseliUrl: "",
    galeri: "",
    youtubeUrl: "",
    detayVideoUrl: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm((p) => ({ ...p, ...initialData }));
    }
  }, [initialData]);

  const galeriUrlList = useMemo(() => {
    if (!form.galeri) return [];
    return form.galeri
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
  }, [form.galeri]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;

    if (!form.baslik.trim()) {
      toast.error("Başlık zorunlu");
      return;
    }
    if (!form.kapakGorseliUrl.trim()) {
      toast.error("Kapak zorunlu");
      return;
    }

    setSaving(true);
    const t = toast.loading(
      mode === "create" ? "Kaydediliyor..." : "Güncelleniyor..."
    );

    try {
      await onSubmit({
        ...form,
        yil: form.yil ? String(Number(form.yil)) : "",
      });
      toast.success(
        mode === "create" ? "Eser eklendi" : "Eser güncellendi",
        { id: t }
      );
    } catch (e: any) {
      toast.error(e?.message || "İşlem başarısız", { id: t });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <Input
        label="Başlık *"
        value={form.baslik}
        onChange={(e: any) =>
          setForm((p) => ({ ...p, baslik: e.target.value }))
        }
      />

      <Select
        label="Kategori"
        value={form.kategori}
        onChange={(e: any) =>
          setForm((p) => ({ ...p, kategori: e.target.value }))
        }
        options={[
          { value: "cami", label: "Cami" },
          { value: "villa", label: "Villa" },
          { value: "tas-ev", label: "Taş Ev" },
          { value: "restorasyon", label: "Restorasyon" },
        ]}
      />

      <Textarea
        label="Açıklama"
        value={form.aciklama}
        onChange={(e: any) =>
          setForm((p) => ({ ...p, aciklama: e.target.value }))
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Konum"
          value={form.konum}
          onChange={(e: any) =>
            setForm((p) => ({ ...p, konum: e.target.value }))
          }
        />
        <Input
          label="Yıl"
          value={form.yil}
          onChange={(e: any) =>
            setForm((p) => ({ ...p, yil: e.target.value }))
          }
        />
        <Input
          label="YouTube URL"
          value={form.youtubeUrl}
          onChange={(e: any) =>
            setForm((p) => ({ ...p, youtubeUrl: e.target.value }))
          }
        />
      </div>

      <Textarea
        label="Galeri URL (virgülle ayır)"
        value={form.galeri}
        onChange={(e: any) =>
          setForm((p) => ({ ...p, galeri: e.target.value }))
        }
      />

      {galeriUrlList.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {galeriUrlList.map((u, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={u}
              className="h-28 w-full object-cover rounded"
            />
          ))}
        </div>
      )}

      <button
        disabled={saving}
        className="bg-white text-black px-6 py-2 rounded-md disabled:opacity-50"
      >
        {saving ? "İşleniyor..." : submitLabel}
      </button>
    </form>
  );
}

/* ----------------- küçük UI bileşenleri ----------------- */

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm text-neutral-400 mb-1">{label}</label>
      <input
        {...props}
        className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2"
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
        className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2"
      />
    </div>
  );
}

function Select({ label, options, ...props }: any) {
  return (
    <div>
      <label className="block text-sm text-neutral-400 mb-1">{label}</label>
      <select
        {...props}
        className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2"
      >
        {options.map((o: any) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
