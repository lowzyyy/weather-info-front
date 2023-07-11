import React, { useContext, useState } from "react";
import useSWR from "swr";

import SelectedDay from "./SelectedDay";
import SevenDaysSection from "./SevenDaysSection";
import { API_WEATHER, fetcher } from "@/helpers/constants";
import { UrlContext } from "../UrlContext/UrlContext";

const ForecastCard = () => {
  const [currentDay, setCurrentDay] = useState(0);

  const selectDay = (e) => {
    const selectedId = Number(e.currentTarget.dataset.dayid);
    setCurrentDay(selectedId);
  };
  const API_WEATHER = useContext(UrlContext);
  const { data, error, isLoading } = useSWR(`${API_WEATHER}/forecast`, fetcher);
  if (isLoading) return <p className="max-w-3xl md:mx-auto">LOADING FORECAST....</p>;
  if (data.length === 0)
    return <p className="max-w-3xl md:mx-auto">NO FORECAST DATA...</p>;
  if (error) return <p className="max-w-3xl md:mx-auto">ERROR FORECAST...</p>;

  const sunriseTime = data[0].sunriseTime.split(":")[0];
  const sunsetTime = data[0].sunsetTime.split(":")[0];
  const currentHour = new Date().getHours();
  const cardTheme =
    currentHour > sunsetTime || currentHour < sunriseTime
      ? "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
      : "bg-gradient-to-b from-sky-600 via-sky-700  to-sky-600";

  return (
    <section
      className={`mb-5 max-w-3xl rounded-md ${cardTheme} p-2 text-white md:mx-auto md:p-4`}
    >
      <SelectedDay dayInfo={data[currentDay]}></SelectedDay>
      <SevenDaysSection
        days={data}
        selectDay={selectDay}
        currSelected={currentDay}
      ></SevenDaysSection>
    </section>
  );
};

export default ForecastCard;
