import mongoose from "mongoose";
import { pickSchema } from "../pick/pick.model";

const cardSchema = new mongoose.Schema(
  {
    picksType: { type: String, enum: ["weekly", "topic"], required: true },
    title: { type: String, maxLength: 60 },
    tags: { type: Array, maxLength: 5 },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    picks: [pickSchema],
    comments: { type: String, maxLength: 200 },
  },
  { timestamps: true }
);

cardSchema.pre("save", function (next) {
  if (this.picks.length > 5) {
    return next(new Error("You can't have more than 5 picks"));
  }
  next();
});

export const Card = mongoose.model("Card", cardSchema);
