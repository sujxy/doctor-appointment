import React, { useEffect, useState } from "react";
import { useUser } from "../context/user";
import axios from "axios";
import { Bell } from "lucide-react";

export default function Appointments() {
  const { user } = useUser();
  const [appointments, setAppointments] = useState([]);
  const getAppointments = async () => {
    const { data } = await axios.get("/appointment");
    setAppointments(data);
  };
  const formatDate = (date) => {
    const dateObj = new Date(date);
    const res = dateObj.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    return res;
  };

  useEffect(() => {
    if (user) {
      getAppointments();
    }
  }, []);

  return user ? (
    <div className="w-full mb-4">
      <h1 className="h-1/6  border-s-4 border-s-primary font-light text-2xl text-primary ps-2 ms-2 mb-2">
        Appointments
      </h1>
      {appointments
        ? appointments?.map((item) => {
            return (
              <div className="flex justify-start gap-2 w-3/4 mx-auto my-1">
                <Bell color="#0085FF" strokeWidth={2.5} />
                <h1>{formatDate(item.date)}</h1>
              </div>
            );
          })
        : "No appointments"}
    </div>
  ) : null;
}
