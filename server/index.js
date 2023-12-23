import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("common"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

const port = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => app.listen(port, () => console.log(`listening on ${port}`)))
  .catch((err) => console.log("could'nt connect to server", err));
