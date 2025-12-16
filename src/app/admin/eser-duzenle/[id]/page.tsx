"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import EserForm, { FormState } from "@/components/admin/EserForm";

export default function EserDuzenlePage() {
  const { id } = useParams();
  const router = useRouter();
  const [eser, setEser] = useState<FormState | null>(null);

  useEffect(() => {
    async function fetchEser() {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`/api/eserler/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      setEser({
        ...data,
        yil: data.yil ? String(data.yil) : "",
        galeri: data.galeri?.join(", ") || "",
      });
    }
    fetchEser();
  }, [id]);

  if (!eser) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-10">
      <h1 className="text-2xl mb-6">Eser Düzenle</h1>

      <EserForm
        mode="edit"
        submitLabel="Güncelle"
        initialData={eser}
        onSubmit={async (data: FormState) => {
          const token = localStorage.getItem("admin_token");
          const res = await fetch(`/api/eserler/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              ...data,
              yil: data.yil ? Number(data.yil) : undefined,
              galeri: data.galeri
                ? data.galeri.split(",").map((x) => x.trim())
                : [],
            }),
          });

          if (!res.ok) throw new Error("Güncelleme başarısız");
          router.push("/admin/eserler");
        }}
      />
    </div>
  );
}
