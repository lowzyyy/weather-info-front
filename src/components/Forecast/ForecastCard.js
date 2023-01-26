import React, { useState } from "react";
import useSWR from "swr";

import SelectedDay from "./SelectedDay";
import SevenDaysSection from "./SevenDaysSection";
import { API_WEATHER } from "@/helpers/constants";

const ForecastCard = () => {
  const [currentDay, setCurrentDay] = useState(0);

  const selectDay = (e) => {
    const selectedId = Number(e.currentTarget.dataset.dayid);
    setCurrentDay(selectedId);
  };

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`${API_WEATHER}/tenday`, fetcher);
  if (isLoading) return <p>LOADING FORECAST....</p>;
  if (error) return <p>ERROR FORECAST...</p>;

  return (
    <section className="mb-5 rounded-md bg-gradient-to-t from-sky-700 to-sky-600 p-2 text-white">
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
