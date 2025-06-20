import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    original_url: { type: String, required: true },
    short_code: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model("Url", urlSchema);
