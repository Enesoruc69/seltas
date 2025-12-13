export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { dbBaglan } from "@/lib/db";
import Eser from "@/models/Eser";

export async function GET() {
  console.log("GET /api/eserler çağrıldı");

  await dbBaglan();
  const eserler = await Eser.find().sort({ createdAt: -1 });

  return NextResponse.json(eserler);
}
