import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import AppointmentType from "../components/appointmentType";
import ClinicDetails from "../components/clinicDetails";
import Slots from "../components/Slots";
import SummarySection from "../components/summarySection";
import { useUser } from "../context/user.js";

export default function BookingPage() {
  const { doc_id } = useParams();
  const [doctorData, setDoctorData] = useState(null);
  const [clinicData, setClinicData] = useState(null);
  const [consultType, setConsultType] = useState("inClinic");
  const [clinicId, setClinicId] = useState(null);
  const [currentDate, setCurrentDate] = useState();
  const [currentSlotId, setCurrentSlotId] = useState();
  const [showSummary, setShowSummary] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const { user } = useUser();

  const navigate = useNavigate();

  const getDoctorDetails = async () => {
    const { data } = await axios.get(`/doctor/${doc_id}`);
    setDoctorData(data);
  };

  const getDoctorClinics = async () => {
    const { data } = await axios.get(`/clinic/${doc_id}`);
    setClinicData(data);
  };

  const createAppointment = async () => {
    if (!user) {
      navigate("/auth");
    }
    if (user) {
      const { data } = await axios.post("/appointment", {
        doc_id: doc_id,
        clinic_id: clinicId,
        slot_id: currentSlotId,
      });
      if (data.msg === "success") {
        setConfirm(true);
      }
    }
  };

  useEffect(() => {
    getDoctorDetails();
    getDoctorClinics();
  }, []);

  return (
    <div className="w-3/4 min-h-[720px] mx-auto border-x  ">
      {doctorData ? (
        <div className="w-full min-h-[120px] border-b flex items-center justify-start  py-6 px-4">
          <div className="w-1/5">
            <img
              src={"/doctorImage.jpeg"}
              className="h-24 w-24 object-cover rounded-full border mx-auto"
              alt="doctor"
            />
          </div>

          <div className="font-poppins text-left w-1/2 ">
            <h1 className="text-lg">{doctorData?.name}</h1>
            <h2 className=" text-gray-500  text-sm mb-3">
              {doctorData?.specialization}
            </h2>
            <Link className="outline-btn-sm  ">Details</Link>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
      {!showSummary ? (
        <>
          <AppointmentType
            consultType={consultType}
            setConsultType={setConsultType}
            doctorData={doctorData}
          />

          <ClinicDetails
            clinicData={clinicData}
            clinicId={clinicId}
            setClinicId={setClinicId}
          />
          <Slots
            doc_id={doc_id}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            currentSlotId={currentSlotId}
            setCurrentSlotId={setCurrentSlotId}
          />
          <div className=" w-full flex flex-row-reverse justify-start px-4">
            <button
              className="outline-btn mt-4"
              onClick={() => setShowSummary(true)}
            >
              Continue
            </button>
          </div>
        </>
      ) : (
        <SummarySection
          clinicId={clinicId}
          consultType={consultType}
          currentSlotId={currentSlotId}
          doctorData={doctorData}
          setShowSummary={setShowSummary}
          createAppointment={createAppointment}
          confirm={confirm}
        />
      )}
    </div>
  );
}
