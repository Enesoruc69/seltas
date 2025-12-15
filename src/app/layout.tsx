import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Seltaş Yapı & Restorasyon",
  description: "Cami, villa, taş ev ve restorasyon projeleri.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="bg-[#F8F7F4] text-[#1C1C1C]">
        <Navbar />
        {children}
        <Footer />

        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: "#111", color: "#fff" },
          }}
        />
      </body>
    </html>
  );
}
