import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

export default function Slots({
  doc_id,
  currentDate,
  setCurrentDate,
  currentSlotId,
  setCurrentSlotId,
}) {
  const [dates, setDates] = useState([]);

  const [currentSlots, setCurrentSlots] = useState([]);

  const formatToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getSlots = async (date) => {
    const formattedDate = formatToYYYYMMDD(date);
    const reqString = `/slot?doc_id=${doc_id}&date=${formattedDate}`;
    const { data } = await axios.get(reqString);
    setCurrentSlots(data);
  };

  useEffect(() => {
    const today = new Date();

    const dateData = [];
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dateData.push(date);
    }
    setDates(dateData);
    setCurrentDate(dateData[0]);
    getSlots(dateData[0]);
  }, []);

  const settings = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
  };

  return (
    <>
      <div className="w-full font-poppins border-b shadow mt-3">
        <Slider {...settings}>
          {dates.map((date) => (
            <div key={date.getTime()} className="">
              <div
                onClick={() => {
                  getSlots(date);
                  setCurrentDate(date);
                }}
                className={`${
                  currentDate === date
                    ? "bg-blue-800 text-white rounded-t-md"
                    : "bg-white"
                } text-center flex flex-col items-center gap-1 py-2`}
              >
                {date.toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {currentSlots ? (
        <div className="grid grid-cols-3 gap-2 p-4">
          {currentSlots?.map((slot) => {
            return !slot.available ? (
              <div
                className={"bg-gray-300 text-white text-center rounded-md py-2"}
              >
                {slot.time}
              </div>
            ) : (
              <div
                className={`${
                  currentSlotId === slot._id
                    ? "bg-blue-400 text-white "
                    : "bg-white"
                } text-center border border-gray-300 rounded-md py-2`}
                onClick={() => {
                  setCurrentSlotId(slot._id);
                }}
              >
                {slot.time}
              </div>
            );
          })}
        </div>
      ) : (
        "loading..."
      )}
    </>
  );
}
