import express from "express";
import { generateOpt, setLogout, verifyOtp } from "../controllers/auth.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/generate-otp", generateOpt);
router.post("/login", verifyOtp);
router.post("/logout", verifyToken, setLogout);

export default router;
