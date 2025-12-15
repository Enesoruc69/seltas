import mongoose from "mongoose";

const EserSchema = new mongoose.Schema(
  {
    baslik: String,
    slug: String,
    kategori: String,
    aciklama: String,
    konum: String,
    yil: Number,

    kapakGorseliUrl: String,

    // ADVANCED MEDIA
    kapakPosterUrl: String,     // video için
    kapakBlurDataURL: String,   // image için

    galeri: [String],
    youtubeUrl: String,
  },
  { timestamps: true }
);

export default mongoose.models.Eser ||
  mongoose.model("Eser", EserSchema);
