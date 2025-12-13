export const runtime = "nodejs";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbBaglan } from "@/lib/db";
import Eser from "@/models/Eser";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // 🔥 KRİTİK SATIR

  console.log("🗑 DELETE route hit:", id);

  const auth = req.headers.get("authorization");
  if (!auth) {
    return NextResponse.json({ mesaj: "Yetkisiz" }, { status: 401 });
  }

  try {
    jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET as string);
  } catch {
    return NextResponse.json({ mesaj: "Token geçersiz" }, { status: 401 });
  }

  await dbBaglan();

  const silinen = await Eser.findByIdAndDelete(id);
  if (!silinen) {
    return NextResponse.json(
      { mesaj: "Eser bulunamadı" },
      { status: 404 }
    );
  }

  return NextResponse.json({ mesaj: "Silindi" });
}
