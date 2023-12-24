import express from "express";
import { getAllDoctors, getDoctor } from "../controllers/doctor.js";

const router = express.Router();

router.get("/all", getAllDoctors);
router.get("/:id", getDoctor);

export default router;
