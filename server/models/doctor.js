import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  fees: {
    inClinic: Number,
    video: Number,
    audio: Number,
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
