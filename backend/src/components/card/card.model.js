import mongoose from "mongoose";
import { pickSchema } from "../pick/pick.model";

const cardSchema = new mongoose.Schema(
  {
    picksType: { type: String, enum: ["weekly", "topic"], required: true },
    title: { type: String, maxLength: 60 },
    tags: { type: Array, maxLength: 5 },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    picks: [pickSchema],
  },
  { timestamp: true }
);

// cardSchema.pre("find", function () {
//   this.populate(["picks"]);
// });

export const Card = mongoose.model("Card", cardSchema);
