import Patient from "../models/patient.js";
import OTP from "../models/otp.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendOTPEmail from "./mailer.js";

const createOtp = () => {
  return `${Math.floor(1000 + Math.random() * 9000)}`;
};

const getLatestOtp = async (email) => {
  const { _id: userId } = await Patient.findOne({ email });
  const savedOtp = await OTP.findOne({
    userId: userId,
    valid: true,
  }).sort({ createdAt: -1 });
  return savedOtp;
};

const destroyOtp = async (id) => {
  await OTP.deleteOne({ _id: id });
};

export const generateOpt = async (req, res) => {
  try {
    const { email } = req.body;
    const userExists = await Patient.findOne({ email });
    if (!userExists) {
      const newUser = new Patient({
        email: email,
      });
      await newUser.save();
    }
    const newOtp = createOtp();
    const hashedOtp = await bcrypt.hash(newOtp, 10);
    const { _id: userId } = await Patient.findOne({ email });

    //new otp data
    const otp = new OTP({
      userId: userId,
      value: hashedOtp,
      valid: true,
    });
    await otp.save();

    //mail user
    await sendOTPEmail(email, newOtp);

    res.status(200).json({ msg: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, inputOtp } = req.body;
    const latestOtp = await getLatestOtp(email);

    if (latestOtp && latestOtp.valid && latestOtp.expiresAt > new Date()) {
      const match = await bcrypt.compare(inputOtp, latestOtp.value);
      if (match) {
        //delete otp
        await destroyOtp(latestOtp._id);
        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        res
          .status(200)
          .cookie("token", token)
          .json({ msg: "login successful" });

        return;
      } else {
        res.status(400).json({ error: "invalid OTP" });
      }
    } else {
      res.status(400).json({ error: "otp expired" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const setLogout = async (req, res) => {
  try {
    if (req.user.email) {
      res.status(200).cookie("token", null).json({ msg: "logout successful" });
    } else {
      res.status(404).json({ error: "user dosent exists" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
