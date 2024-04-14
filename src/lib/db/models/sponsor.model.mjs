import mongoose, { Schema } from "mongoose";
import Link from "next/link";
mongoose.set("runValidators", true);

const sponsorScheme = new Schema(
  {
    name: { type: String, required: true },
    imagePath: { type: String, default: "/products/no-sponsor.jpg" },
    link: { type: String, default: "https://mcdm.dk/"},
    created: { type: Date, default: new Date() },
    
  },
);

export default mongoose.models.sponsor ||
  mongoose.model("sponsor", sponsorScheme);
