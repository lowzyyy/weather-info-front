//imports
import React, { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

//custom imports
import {
  waterDataSettings,
  firstWaterDefenseSettings,
  secondWaterDefenseSettings,
  options,
  DUMMY_DATA_1,
  DUMMY_DATA_2,
} from "./graphSettings";
import { htmlLegendPlugin } from "./htmlLegendPlugin";
import IntervalOptions from "./IntervalOptions";

const days30 = 30;
const days60 = 60;
const days90 = 90;
function WaterGraph() {
  const {
    data: levels,
    isLoading: isLoadingLevels,
    error: errorLevels,
  } = useSWR(`/api/waterLevels`, (...args) =>
    fetch(...args).then((res) => res.json())
  );
  // STATES
  const [selectedInt, setSelectedInt] = useState(days30);
  let selectedData = [];
  levels ? (selectedData = levels.slice(levels.length - selectedInt)) : [];

  // CALLBACKS
  const dataCallback = useCallback((e) => {
    const interval = +e.target.dataset.interval;
    setSelectedInt(interval);
  });
  const data = {
    labels: selectedData.map((el) => {
      const date = el.date.slice(4);
      return date.slice(2) + "." + date.slice(0, 2);
    }),
    datasets: [
      {
        data: selectedData.map((el) => el.level),
        ...waterDataSettings,
      },
      {
        data: Array(selectedData.length).fill(600),
        ...firstWaterDefenseSettings,
      },
      {
        data: Array(selectedData.length).fill(700),
        ...secondWaterDefenseSettings,
      },
    ],
  };

  if (isLoadingLevels) return <p>Loading water level...</p>;
  if (errorLevels) return <p>Error loading water level...</p>;
  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-1 font-semibold md:mb-4 md:text-2xl">
        Danube level Smederevo
      </h2>
      <IntervalOptions
        levelsLength={levels.length}
        dataCallback={dataCallback}
        selectedInt={selectedInt}
      />
      <div className="rounded-md bg-[#ffffff98]">
        <div className="" id="legend-container"></div>
        <Line data={data} options={options} plugins={[htmlLegendPlugin]}></Line>
      </div>
    </div>
  );
}

export default WaterGraph;
