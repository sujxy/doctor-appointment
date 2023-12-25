import React from "react";
import { Phone, Stethoscope, Camera } from "lucide";

export default function AppointmentType({
  consultType,
  setConsultType,
  doctorData,
}) {
  const handleConsultType = (e) => {
    setConsultType(e.target.value);
  };
  return (
    <div className=" w-full flex items-center justify-between px-4 py-3">
      <div className="font-poppins ">
        <h1 className="text-base">Book Appointment</h1>
        <h2 className="font-light text-gray-500 ">
          Select your consultation type{" "}
        </h2>
        <h2 className="text-base font-light text-primary mt-4">
          Estimated Fees : <b>{doctorData?.fees[consultType]}</b>
        </h2>
      </div>

      <div className="flex gap-2 justify-between items-center">
        <label
          id="inClinic"
          className={` flex flex-col w-18 text-center p-2 rounded-md border border-blue-500 text-blue-700 `}
        >
          <input
            type="radio"
            value="inClinic"
            checked={consultType === "inClinic"}
            onChange={handleConsultType}
            className="peer"
          />
          InClinic
        </label>
        <label className="flex flex-col w-16 text-center p-2 rounded-md border border-blue-500 text-blue-700 ">
          <input
            type="radio"
            value="audio"
            checked={consultType === "audio"}
            onChange={handleConsultType}
            className="peer"
          />
          Audio
        </label>
        <label className="flex flex-col w-16 text-center p-2 rounded-md border border-blue-500 text-blue-700 ">
          <input
            type="radio"
            value="video"
            checked={consultType === "video"}
            onChange={handleConsultType}
            className="peer"
          />
          Video
        </label>
      </div>
    </div>
  );
}
