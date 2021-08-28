import mongoose from "mongoose";
import { pickSchema } from "../pick/pick.model";

const cardSchema = new mongoose.Schema(
  {
    comments: { type: String, maxLength: 200 },
    picks: [pickSchema],
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    tags: { type: Array, maxLength: 5 },
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
