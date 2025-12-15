export const runtime = "nodejs";

import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) return NextResponse.json({ error: "Dosya yok" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const isVideo = file.type.startsWith("video/");
  const folder = isVideo ? "seltas/videolar" : "seltas/galeriler";

  const result = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: isVideo ? "video" : "image",

        // Eager: Cloudinary yüklerken türevleri de üretsin
        eager: isVideo
          ? [
              { quality: "auto", fetch_format: "auto", width: 1920, crop: "limit" }, // ana
              { format: "jpg", width: 1280, crop: "limit" }, // poster için alternatif
            ]
          : [
              { quality: "auto", fetch_format: "auto", width: 1600, crop: "limit" }, // ana
              { quality: "auto", fetch_format: "auto", width: 600, crop: "limit" },  // thumbnail
            ],
        eager_async: true, // upload’u bloklamasın

        // isteğe bağlı tag
        tags: ["seltas"],
      },
      (err, res) => (err ? reject(err) : resolve(res))
    ).end(buffer);
  });

  // Blur placeholder: küçük görselden base64 üret (sadece image için)
  let blurDataURL: string | null = null;
  if (!isVideo) {
    const tinyUrl = cloudinary.url(result.public_id, {
      resource_type: "image",
      type: "upload",
      transformation: [
        { width: 24, crop: "limit" },
        { quality: "auto", fetch_format: "jpg" },
      ],
    });

    // Cloudinary base64 endpoint: data üretmek için fetch edip base64'e çeviriyoruz
    const tinyRes = await fetch(tinyUrl);
    const arr = new Uint8Array(await tinyRes.arrayBuffer());
    const base64 = Buffer.from(arr).toString("base64");
    blurDataURL = `data:image/jpeg;base64,${base64}`;
  }

  // Video poster: videodan otomatik thumbnail (frame)
  const posterUrl = isVideo
    ? cloudinary.url(result.public_id, {
        resource_type: "video",
        type: "upload",
        transformation: [
          { quality: "auto" },
          { fetch_format: "jpg" },
          { width: 1280, crop: "limit" },
          { start_offset: "0" }, // ilk frame
        ],
      })
    : null;

  return NextResponse.json({
    url: result.secure_url,
    public_id: result.public_id,
    type: result.resource_type,
    blurDataURL, // image için
    posterUrl,   // video için
  });
}
