import mongoose from "mongoose";

const clinicSchema = new mongoose.Schema({
  doc_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
});

const Clinic = mongoose.model("Clinic", clinicSchema);

export default Clinic;
