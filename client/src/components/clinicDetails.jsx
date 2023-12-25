import React from "react";

export default function ClinicDetails({ clinicData, clinicId, setClinicId }) {
  return (
    <div className=" w-full flex flex-col items-start justify-between px-4 py-2 font-poppins ">
      <h1 className="text-base mb-2">Clinic Name</h1>
      {clinicData?.map((clinic) => {
        return (
          <label className="px-2 py-1 w-5/6 ms-6 ">
            <input
              type="radio"
              value={clinic._id}
              checked={clinicId === clinic._id}
              onChange={(e) => setClinicId(e.target.value)}
              className="peer"
            />
            <span className="ms-2 text-gray-500 peer-checked:text-primary peer-checked:font-semibold transition-all">
              {`${clinic.name}, ${clinic.address}, ${clinic.pincode}`}
            </span>
          </label>
        );
      })}
    </div>
  );
}
