import React from "react";
import SevenDaysItem from "./SevenDaysItem";

const SevenDaysSection = (props) => {
  return (
    <div className="mb-2 flex h-24 gap-3 overflow-x-auto md:h-28 md:gap-4 md:pb-4 ">
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
