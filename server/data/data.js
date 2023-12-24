import mongoose from "mongoose";

// ----------------------------------------------------------------
// this file contains dummy data for project simulation
// already imported in index.js file
// uncomment before app.listen() to add data then restart server
// after its added comment it out again
// ----------------------------------------------------------------

export const doctorsData = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Dr. Varun Chaterjee",
    specialization: "Opthalmologist",
    fees: {
      inClinic: 545,
      video: 500,
      audio: 450,
    },
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Dr. Sonika Gandhi",
    specialization: "Cardiologist",
    fees: {
      inClinic: 545,
      video: 500,
      audio: 450,
    },
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Dr. Meghna Mehta",
    specialization: "Pediatrician",
    fees: {
      inClinic: 545,
      video: 500,
      audio: 450,
    },
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Dr. Arun Prajapat",
    specialization: "Surgeon",
    fees: {
      inClinic: 545,
      video: 500,
      audio: 450,
    },
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Dr. Karan Sehgal",
    specialization: "Gynecology",
    fees: {
      inClinic: 545,
      video: 500,
      audio: 450,
    },
  },
];

export const clinicData = [
  {
    _id: new mongoose.Types.ObjectId(),
    doc_id: "65888ebe2a5f1b171c3038a1",
    name: "Shree Clinic",
    address: "kalyan,maharashtra",
    pincode: "411018",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    doc_id: "65888ebe2a5f1b171c3038a1",
    name: "Sai Clinic",
    address: "Dombivili,maharashtra",
    pincode: "411020",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    doc_id: "65888ebe2a5f1b171c3038a5",
    name: "Ganesh Clinic",
    address: "Ujjain,Rajasthan",
    pincode: "501109",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    doc_id: "65888ebe2a5f1b171c3038a2",
    name: "MedPlus",
    address: "Gwaliar,Rajasthan",
    pincode: "502234",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    doc_id: "65888ebe2a5f1b171c3038a4",
    name: "Satyam Clinic",
    address: "Pune,Maharashtra",
    pincode: "411001",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    doc_id: "65888ebe2a5f1b171c3038a3",
    name: "Pamilla Clinic",
    address: "Pune,maharashtra",
    pincode: "411030",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    doc_id: "65888ebe2a5f1b171c3038a2",
    name: "City Hospital",
    address: "Ahmedabad,Gujarat",
    pincode: "311018",
  },
];

const generateDummySlots = (doctors) => {
  const slots = [];

  doctors.forEach((doctor) => {
    // Generate slots for each day from today until 15 days ahead
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 15);

    for (
      let currentDate = new Date(startDate);
      currentDate <= endDate;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      // Generate slots for each day from 10:00 AM to 11:45 AM with 15-minute intervals
      const startTime = new Date(currentDate);
      startTime.setHours(10, 0, 0, 0);

      const endTime = new Date(currentDate);
      endTime.setHours(11, 45, 0, 0);

      for (
        let currentTime = new Date(startTime);
        currentTime <= endTime;
        currentTime.setMinutes(currentTime.getMinutes() + 15)
      ) {
        const slot = {
          doc_id: doctor,
          date: new Date(currentTime),
          time: currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          available: true,
        };

        slots.push(slot);
      }
    }
  });

  return slots;
};

// Generate dummy slots for each doctor
export const dummySlots = generateDummySlots([
  "65888ebe2a5f1b171c3038a1",
  "65888ebe2a5f1b171c3038a2",
  "65888ebe2a5f1b171c3038a3",
  "65888ebe2a5f1b171c3038a4",
  "65888ebe2a5f1b171c3038a5",
]);
