import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import slotRoutes from "./routes/slotRoutes.js";

import { doctorsData, clinicData, dummySlots } from "./data/data.js";

import Doctor from "./models/doctor.js";
import Clinic from "./models/clinic.js";
import Slot from "./models/slot.js";

const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(morgan("common"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

const port = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // Doctor.insertMany(doctorsData);  //uncomment to insert dummy data
    // Clinic.insertMany(clinicData);
    // Slot.insertMany(dummySlots);
    app.listen(port, () => console.log(`listening on ${port}`));
  })
  .catch((err) => console.log("could'nt connect to server", err));

app.use("/auth", authRoutes);
app.use("/doctor", doctorRoutes);
app.use("/slot", slotRoutes);
// app.use("/appointment", appointmentRoutes);

app.get("*", (req, res) => res.status(404).json({ error: "not found" }));
