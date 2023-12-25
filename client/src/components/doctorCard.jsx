import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function DoctorCard({ _id, name, specialization, fees }) {
  return (
    <div className="w-3/4 min-h-[120px] my-3 mx-auto rounded-lg shadow border flex items-center justify-between py-4 pe-6">
      <img
        src={"./doctorImage.jpeg"}
        className="h-24 w-24 object-cover rounded-full border mx-auto"
        alt="doctor"
      />

      <div className="font-poppins text-left w-1/2">
        <h1 className="text-lg">{name}</h1>
        <h2 className=" text-gray-600 mb-3">{specialization}</h2>
        <h3 className="text-blue-800 font-light text-sm">
          Fees : ₹{fees.inClinic}
        </h3>
      </div>
      <div className="flex w-1/4 flex-col items-center justify-evenly gap-3 py-2 px-1">
        <Link to={`/book/${_id}`} className="outline-btn-sm w-full">
          Book
        </Link>
        <Link className="outline-btn-sm w-full ">Details</Link>
      </div>
    </div>
  );
}
