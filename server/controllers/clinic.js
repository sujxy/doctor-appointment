import Clinic from "../models/clinic.js";

//get doctor clininc

export const getDoctorClinics = async (req, res) => {
  try {
    const { doc_id } = req.params;
    const clinics = await Clinic.find({ doc_id });
    res.status(200).json(clinics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getClinic = async (req, res) => {
  try {
    const { clinic_id } = req.query;
    const clinic = await Clinic.findOne({ _id: clinic_id });
    res.status(200).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
