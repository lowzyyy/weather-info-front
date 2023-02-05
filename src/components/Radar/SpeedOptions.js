import React from "react";

function SpeedOptions(props) {
  return (
    <div className="mb-1 flex animate-fadeIn gap-2 text-base">
      Speed:
      <span
        onClick={props.speedCallback}
        className={`rounded-md px-1 hover:cursor-pointer ${
          props.speedMultiplier === 1.25 ? "bg-stone-400 text-white" : ""
        }`}
        data-speed={1.25}
      >
        0.75x
      </span>
      <span
        onClick={props.speedCallback}
        className={` rounded-md px-1 hover:cursor-pointer ${
          props.speedMultiplier === 1 ? "bg-stone-400 text-white" : ""
        }`}
        data-speed={1}
      >
        1.0x
      </span>
      <span
        onClick={props.speedCallback}
        className={`rounded-md px-1 hover:cursor-pointer ${
          props.speedMultiplier === 0.75 ? "bg-stone-400 text-white" : ""
        }`}
        data-speed={0.75}
      >
        1.25x
      </span>
    </div>
  );
}

export default SpeedOptions;
