import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 100 },
    url: { type: String, required: true },
    notes: { type: String, maxlength: 140 },
    likes: Number,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
    list: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "list",
      required: true,
    },
  },
  { timestamps: true }
);

export const Item = mongoose.model("item", itemSchema);
