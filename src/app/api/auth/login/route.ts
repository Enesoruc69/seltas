import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { tokenOlustur } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, sifre } = await req.json();

  if (email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ mesaj: "Hatalı giriş" }, { status: 401 });
  }

  const hash = await bcrypt.hash(process.env.ADMIN_SIFRE as string, 10);
  const dogruMu = await bcrypt.compare(sifre, hash);

  if (!dogruMu) {
    return NextResponse.json({ mesaj: "Hatalı giriş" }, { status: 401 });
  }

  const token = tokenOlustur({ rol: "admin" });

  return NextResponse.json({ token });
}
