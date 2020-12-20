import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

import { connect } from "./utils/db";

export const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ msg: "Hello worldling!" });
});

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
