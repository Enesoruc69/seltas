"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      router.replace("/admin/login");
    }
  }, [router]);

  function cikisYap() {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 p-6">
        <h2 className="text-xl font-light">Seltaş Admin</h2>

        <nav className="mt-10 space-y-3 text-sm">
          <button
            className="w-full text-left px-3 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 transition"
          >
            Dashboard
          </button>

          <button
            className="w-full text-left px-3 py-2 rounded-md hover:bg-neutral-800 transition"
          >
            Eser Ekle
          </button>

          <button
            className="w-full text-left px-3 py-2 rounded-md hover:bg-neutral-800 transition"
          >
            Eserler
          </button>
        </nav>

        <button
          onClick={cikisYap}
          className="mt-10 text-sm text-red-400 hover:text-red-300"
        >
          Çıkış Yap
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-light">Hoş geldin 👋</h1>

        <p className="text-neutral-400 mt-4">
          Seltaş Yapı ve Restorasyon yönetim panelindesin.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <DashboardCard
            title="Toplam Eser"
            value="—"
            desc="Sisteme eklenmiş eser sayısı"
          />
          <DashboardCard
            title="Hizmet Türleri"
            value="4"
            desc="Cami, Villa, Taş Ev, Restorasyon"
          />
          <DashboardCard
            title="Durum"
            value="Aktif"
            desc="Sistem çalışıyor"
          />
        </div>
      </main>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  desc,
}: {
  title: string;
  value: string;
  desc: string;
}) {
  return (
    <div className="border border-neutral-800 rounded-xl p-6 bg-neutral-900">
      <h3 className="text-sm text-neutral-400">{title}</h3>
      <p className="text-3xl mt-2">{value}</p>
      <p className="text-xs text-neutral-500 mt-2">{desc}</p>
    </div>
  );
}
