"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Eser = {
  _id: string;
  baslik: string;
  kategori: string;
  konum?: string;
  yil?: number;
  slug: string;
};

export default function AdminEserlerPage() {
  const router = useRouter();
  const [eserler, setEserler] = useState<Eser[]>([]);
  const [loading, setLoading] = useState(true);
  const [hata, setHata] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    async function fetchEserler() {
      try {
        const res = await fetch("/api/eserler");
        const data = await res.json();
        setEserler(data);
      } catch {
        setHata("Eserler yüklenemedi");
      } finally {
        setLoading(false);
      }
    }

    fetchEserler();
  }, [router]);

  async function eserSil(id: string) {
    const onay = confirm("Bu eseri silmek istediğine emin misin?");
    if (!onay) return;

    const token = localStorage.getItem("admin_token");
    if (!token) return;

    try {
      const res = await fetch(`/api/eserler/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Silme başarısız");
      }

      setEserler((prev) => prev.filter((e) => e._id !== id));
    } catch {
      alert("Silme işlemi başarısız");
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
        <h1 className="text-2xl font-light">Eserler</h1>

        <button
          onClick={() => router.push("/admin/eser-ekle")}
          className="bg-white text-black px-4 py-2 rounded-md hover:bg-neutral-200"
        >
          + Yeni Eser
        </button>
      </div>

      {hata && <p className="text-red-400">{hata}</p>}

      {eserler.length === 0 ? (
        <p className="text-neutral-400">Henüz eser eklenmemiş.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-neutral-800 text-sm">
            <thead className="bg-neutral-900">
              <tr>
                <th className="p-3 text-left">Başlık</th>
                <th className="p-3 text-left">Kategori</th>
                <th className="p-3 text-left">Konum</th>
                <th className="p-3 text-left">Yıl</th>
                <th className="p-3 text-right">İşlemler</th>
              </tr>
            </thead>

            <tbody>
              {eserler.map((eser) => (
                <tr
                  key={eser._id}
                  className="border-t border-neutral-800 hover:bg-neutral-900 transition"
                >
                  <td className="p-3">{eser.baslik}</td>
                  <td className="p-3 capitalize">{eser.kategori}</td>
                  <td className="p-3">{eser.konum || "-"}</td>
                  <td className="p-3">{eser.yil || "-"}</td>
                  <td className="p-3 text-right space-x-3">
                    <button
                      onClick={() =>
                        router.push(`/admin/eser-duzenle/${eser._id}`)
                      }
                      className="text-blue-400 hover:underline"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => eserSil(eser._id)}
                      className="text-red-400 hover:underline"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
