import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  expiresAt: {
    type: Date,
    default: () => new Date(+new Date() + 10 * 60 * 1000),
  },
  valid: {
    type: Boolean,
    required: true,
  },
});

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
