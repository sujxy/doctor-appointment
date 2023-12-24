import express from "express";
import { getAllSlots, reserveSlot } from "../controllers/slot.js";

const router = express.Router();

router.get("/", getAllSlots);
router.patch("/:slotId", reserveSlot);

export default router;
