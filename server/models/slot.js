import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  doc_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  // clinic_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Clinic",
  //   required: true,
  // },
});

const Slot = mongoose.model("Slot", slotSchema);

export default Slot;
