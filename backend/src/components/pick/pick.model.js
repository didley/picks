import mongoose from "mongoose";

export const pickSchema = new mongoose.Schema(
  {
    image: { type: String, maxLength: 200 },
    title: { type: String, maxLength: 60, required: true },
    url: { type: String, maxLength: 200, required: true },
    comments: { type: String, maxLength: 200 },
    likes: { type: Array },
    nsfw: { type: Boolean, default: false, requited: true },
    fromCard: { type: mongoose.Types.ObjectId, ref: "Card", required: true },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamp: true }
);

export const Pick = mongoose.model("Pick", pickSchema);
