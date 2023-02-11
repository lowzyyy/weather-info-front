import is from "../../styles/weather-icons.min.module.css";
import { computeIcon } from "@/helpers/hourlyHelpers";
import React from "react";

const SevenDaysItem = (props) => {
  const dayIcon = computeIcon(props.data.iconCondition, true);
  // console.log(props.data.iconCondition);
  return (
    <div
      onClick={props.selectDay}
      data-dayid={props.dayId}
      className={`flex w-16 shrink-0 flex-col items-center justify-between rounded-md border border-solid border-white ${
        props.currSelected === props.dayId
          ? "bg-gradient-to-tr from-sky-700 to-blue-600"
          : ""
      }`}
    >
      <span>{props.data.date.split(" ")[0]}</span>
      <span>
        <i
          title={`${props.data.dayCondition}`}
          className={`${is.wi} ${is[`${dayIcon}`]}   text-2xl text-cyan-200`}
        ></i>
      </span>
      <span>{`${props.data.highTemperature} ${props.data.lowTemperature}`}</span>
    </div>
  );
};

export default SevenDaysItem;
