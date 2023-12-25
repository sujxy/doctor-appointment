import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Phone,
  Stethoscope,
  Camera,
  CalendarCheck2,
  Clock10,
} from "lucide-react";

export default function SummarySection({
  clinicId,
  consultType,
  currentDate,
  currentSlotId,
  doctorData,
  setShowSummary,
}) {
  const [clinic, setClinic] = useState(null);
  const [slot, setSlot] = useState(null);
  const icons = {
    inClinic: <Stethoscope color="#0085FF" size={32} />,
    audio: <Phone color="#0085FF" />,
    video: <Camera color="#0085FF" />,
  };

  const getClinic = async () => {
    const reqStr = `/clinic?clinic_id=${clinicId}`;
    const { data } = await axios.get(reqStr);
    setClinic(data);
  };
  const getSlot = async () => {
    const reqStr = `/slot/${currentSlotId}`;
    const { data } = await axios.get(reqStr);
    setSlot(data);
  };

  useEffect(() => {
    getClinic();
    getSlot();
  }, []);

  return (
    <>
      <div className="w-full flex items-center justify-between gap-12 px-8 py-3 ">
        <div className="font-poppins ">
          <h1 className="text-base">Appointment Summary</h1>
          <span className="flex gap-3  my-4 ">
            <div className="flex items-center justify-center p-1 rounded-full bg-blue-100">
              {icons[consultType]}
            </div>

            <div>
              <h2 className="font-light text-gray-500 ">
                {consultType} consultation
              </h2>
              <h2 className="text-base font-light text-primary ">
                Estimated Fees : <b>{doctorData?.fees[consultType]}</b>
              </h2>
            </div>
          </span>
        </div>
        <div className="font-poppins">
          <div className="flex gap-2 justify-start">
            <CalendarCheck2 color="#0085FF" />
            <h1 className="font-light">{slot?.date}</h1>
          </div>
          <div className="flex gap-2 justify-start mt-2">
            <Clock10 color="#0085FF" />
            <h1 className="font-light">{slot?.time}</h1>
          </div>
        </div>
      </div>
      <div className=" w-full flex  justify-between px-8">
        <button
          className="outline-btn mt-4"
          onClick={() => setShowSummary(false)}
        >
          Change Date&Time
        </button>
        <button
          className="outline-btn mt-4"
          onClick={() => setShowSummary(true)}
        >
          Confirm
        </button>
      </div>
    </>
  );
}
