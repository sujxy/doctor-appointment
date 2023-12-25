import express from "express";
import { getClinic, getDoctorClinics } from "../controllers/clinic.js";

const router = express.Router();

router.get("/:doc_id", getDoctorClinics);
router.get("/", getClinic);
export default router;
