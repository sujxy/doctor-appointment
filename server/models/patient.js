import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
