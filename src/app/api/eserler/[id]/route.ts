export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { dbBaglan } from "@/lib/db";
import Eser from "@/models/Eser";

// 🔹 GET (tek eser – düzenleme için)
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await dbBaglan();
  const eser = await Eser.findById(id);

  if (!eser) {
    return NextResponse.json({ mesaj: "Eser bulunamadı" }, { status: 404 });
  }

  return NextResponse.json(eser);
}

// 🔹 PUT (eser güncelle)
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  // 🔒 JWT'yi burada ve güvenli şekilde import et
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

  const { default: jwt } = await import("jsonwebtoken");

  try {
    jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET);
  } catch {
    return NextResponse.json({ mesaj: "Token geçersiz" }, { status: 401 });
  }

  const body = await req.json();
  await dbBaglan();

  const guncellenen = await Eser.findByIdAndUpdate(
    id,
    {
      baslik: body.baslik,
      kategori: body.kategori,
      aciklama: body.aciklama,
      detayVideoUrl: body.detayVideoUrl,
      konum: body.konum,
      yil: body.yil,
      kapakGorseliUrl: body.kapakGorseliUrl,
      galeri: body.galeri,
      youtubeUrl: body.youtubeUrl,
    },
    { new: true }
  );

  if (!guncellenen) {
    return NextResponse.json({ mesaj: "Eser bulunamadı" }, { status: 404 });
  }

  return NextResponse.json(guncellenen);
}
// 🔹 DELETE (eser sil)
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

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

  const { default: jwt } = await import("jsonwebtoken");

  try {
    jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET);
  } catch {
    return NextResponse.json({ mesaj: "Token geçersiz" }, { status: 401 });
  }

  await dbBaglan();

  const silinen = await Eser.findByIdAndDelete(id);

  if (!silinen) {
    return NextResponse.json({ mesaj: "Eser bulunamadı" }, { status: 404 });
  }

  return NextResponse.json({ mesaj: "Silindi" });
}
