import React from "react";
import SevenDaysItem from "./SevenDaysItem";

const SevenDaysSection = (props) => {
  return (
    <div className="mb-2 flex h-24 gap-3 overflow-x-scroll md:justify-between md:px-10">
      {props.days.map((day, index) => {
        return (
          <SevenDaysItem
            key={index}
            dayId={index}
            data={day}
            selectDay={props.selectDay}
            currSelected={props.currSelected}
          ></SevenDaysItem>
        );
      })}
    </div>
  );
};

export default SevenDaysSection;
