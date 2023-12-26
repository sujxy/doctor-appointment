import express from "express";

import { verifyToken } from "../middleware/verifyToken.js";
import {
  createAppointment,
  getUserAppointment,
} from "../controllers/appointment.js";

const router = express.Router();

router.post("/", verifyToken, createAppointment);
router.get("/", verifyToken, getUserAppointment);

export default router;
