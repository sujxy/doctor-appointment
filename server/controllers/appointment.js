import Appointment from "../models/appointment.js";
import Slot from "../models/slot.js";

export const createAppointment = async (req, res) => {
  try {
    const { userId, email } = req.user;
    const { doc_id, clinic_id, slot_id } = req.body;
    const newAppointment = new Appointment({
      doc_id: doc_id,
      clinic_id: clinic_id,
      slot_id: slot_id,
      patient_id: userId,
    });
    await newAppointment.save();
    await Slot.updateOne({ _id: slot_id }, { $set: { available: false } });

    res.status(200).json({ msg: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).josn({ error: err.message });
  }
};

export const getUserAppointment = async (req, res) => {
  try {
    const { userId, email } = req.user;

    const appointments = await Appointment.find({ patient_id: userId });

    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).josn({ error: err.message });
  }
};
