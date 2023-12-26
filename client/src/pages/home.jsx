import axios from "axios";
import React, { useEffect, useState } from "react";
import DoctorCard from "../components/doctorCard";
import Appointments from "../components/appointments";

export default function Home() {
  const [doctors, setDoctors] = useState();

  const fetchDoctors = async () => {
    const { data } = await axios.get("/doctor/all");
    setDoctors(data);
  };
  useEffect(() => {
    fetchDoctors();
  }, []);
  return (
    <div className="w-3/4 min-h-[720px] mx-auto border-x pt-8 bg-white">
      <Appointments />
      <h1 className="h-1/6  border-s-4 border-s-primary font-light text-2xl text-primary ps-2 ms-2 mb-5">
        Doctors
      </h1>
      <div className=" py-2 h-[630px] overflow-y-scroll  ">
        {doctors
          ? doctors.map((doctor) => {
              console.log(doctor);
              return <DoctorCard {...doctor} />;
            })
          : "Loading..."}
      </div>
      <div className="min-h-[400px] bg-blue-400 flex flex-col py-4 px-4">
        <h1 className="text-white text-2xl font-poppins font-semibold">FAQs</h1>
      </div>
    </div>
  );
}
