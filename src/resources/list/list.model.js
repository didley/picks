import mongoose from "mongoose";

const listSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    status: {
      type: String,
      required: true,
      enum: ["draft", "scheduled", "posted"],
      default: "draft",
      scheduledDate: {
        type: Date,
        enum: ["notScheduled", "date", "nextPicksDate"],
      },
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
    notes: { type: String, maxlength: 140 },
  },
  { timestamps: true }
);

export const List = mongoose.model("list", listSchema);
