import React from "react";

function ProgressBar(props) {
  const rounded = "rounded-sm";
  return (
    <div className={` w-56 rounded-sm bg-white ${rounded}`}>
      <div
        style={{ width: `${props.filled}%` }}
        className={`  h-2 rounded-sm bg-blue-500 transition-all duration-150 ${rounded}`}
      ></div>
    </div>
  );
}

export default ProgressBar;
