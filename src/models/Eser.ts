import mongoose, { Schema, models, model } from "mongoose";

const EserSchema = new Schema(
  {
    baslik: { type: String, required: true },
    slug: { type: String, unique: true },

    kategori: {
      type: String,
      enum: ["cami", "villa", "tas-ev", "restorasyon"],
      required: true
    },

    aciklama: { type: String, required: true },

    konum: String,
    yil: Number,

    kapakGorseliUrl: { type: String, required: true },
    galeri: [String],

    youtubeUrl: String
  },
  { timestamps: true }
);

const Eser = models.Eser || model("Eser", EserSchema);
export default Eser;
