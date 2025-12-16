"use client";

import { useRouter } from "next/navigation";
import EserForm, { FormState } from "@/components/admin/EserForm";

export default function EserEklePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-10">
      <h1 className="text-2xl mb-6">Yeni Eser Ekle</h1>

      <EserForm
        mode="create"
        submitLabel="Kaydet"
        onSubmit={async (data: FormState) => {
          const token = localStorage.getItem("admin_token");
          const res = await fetch("/api/eserler", {
            method: "POST",
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

          if (!res.ok) throw new Error("Ekleme başarısız");
          router.push("/admin/eserler");
        }}
      />
    </div>
  );
}
