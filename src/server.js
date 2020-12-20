import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import { connect } from "./utils/db";
// import { signup, signin, protect } from "./utils/auth";
import userRouter from "./resources/user/user.router";
import listRouter from "./resources/list/list.router";
import itemRouter from "./resources/item/item.router";

export const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/user", userRouter);
app.use("/api/picks", listRouter);
app.use("/api/pick", itemRouter);

export const start = async () => {
  try {
    await connect();
    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `✨     Backend API running on http://localhost:${process.env.PORT}/`
      );
    });
  } catch (e) {
    console.error(e);
  }
};
