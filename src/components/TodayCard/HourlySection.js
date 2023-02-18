import HourlyList from "./HourlyList";
import useSWR from "swr";
import { useState } from "react";
import { API_WEATHER } from "@/helpers/constants";
const HourlySection = (props) => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const [category, setPickedCategory] = useState("temp");
  const categoryCallback = (e) => {
    const clicked = e.target.getAttribute("category");
    setPickedCategory(clicked);
  };
  const {
    data: hourlyData,
    error: hourlyError,
    isLoading: isLoadingHourly,
  } = useSWR(`${API_WEATHER}/hourly`, fetcher);

  if (isLoadingHourly) return <p>LOADING HOURLY....</p>;
  if (hourlyError) return <p>ERROR HOURLY...</p>;

  return (
    <div className="mb-2">
      <div className="mb-2 flex gap-6 overflow-x-auto text-white md:gap-10">
        <span
          category="temp"
          onClick={categoryCallback}
          className={`${
            category === "temp" ? "text-cyan-200 underline" : "text-inherit"
          }`}
        >
          Temp
        </span>
        <span
          category="wind"
          onClick={categoryCallback}
          className={`${
            category === "wind" ? "text-cyan-200 underline" : "text-inherit"
          } `}
        >
          Wind
        </span>
        <span
          category="humid"
          onClick={categoryCallback}
          className={`${
            category === "humid" ? "text-cyan-200 underline" : "text-inherit"
          }`}
        >
          Humidity
        </span>
        <span
          category="precip"
          onClick={categoryCallback}
          className={`${
            category === "precip" ? "text-cyan-200 underline" : "text-inherit"
          }`}
        >
          Precip
        </span>
        <span
          category="cloud"
          onClick={categoryCallback}
          className={`${
            category === "cloud" ? "text-cyan-200 underline" : "text-inherit"
          }`}
        >
          Cloud
        </span>
      </div>
      <HourlyList
        hourlyData={hourlyData}
        category={category}
        sunTimes={props.sunTimes}
      ></HourlyList>
    </div>
  );
};

export default HourlySection;
