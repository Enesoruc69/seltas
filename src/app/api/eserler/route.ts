export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { dbBaglan } from "@/lib/db";
import Eser from "@/models/Eser";
import { slugUret } from "@/lib/slugify";

// ✅ GET → ESERLERİ LİSTELE (AUTH YOK)
export async function GET() {
  await dbBaglan();
  const eserler = await Eser.find().sort({ createdAt: -1 });
  return NextResponse.json(eserler);
}

// 🔒 POST → ESER EKLE (AUTH VAR)
export async function POST(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth) {
    return NextResponse.json({ mesaj: "Yetkisiz" }, { status: 401 });
  }

  if (!process.env.JWT_SECRET) {
    return NextResponse.json(
      { mesaj: "JWT_SECRET eksik" },
      { status: 500 }
    );
  }

  // 🔐 JWT'yi runtime'da import et
  const { default: jwt } = await import("jsonwebtoken");

  try {
    jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET);
  } catch {
    return NextResponse.json({ mesaj: "Token geçersiz" }, { status: 401 });
  }

  const body = await req.json();
  await dbBaglan();

  const eser = await Eser.create({
    baslik: body.baslik,
    slug: slugUret(body.baslik),
    kategori: body.kategori,
    aciklama: body.aciklama,
    konum: body.konum,
    yil: body.yil,
    kapakGorseliUrl: body.kapakGorseliUrl,
    galeri: body.galeri,
    youtubeUrl: body.youtubeUrl,
  });

  return NextResponse.json(eser, { status: 201 });
}
