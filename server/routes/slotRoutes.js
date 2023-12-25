import express from "express";
import { getAllSlots, getSlot, reserveSlot } from "../controllers/slot.js";

const router = express.Router();

router.get("/", getAllSlots);
router.get("/:slotId", getSlot);
router.patch("/:slotId", reserveSlot);

export default router;
