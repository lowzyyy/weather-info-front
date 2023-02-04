import React from "react";

function AnimateOptions(props) {
  return (
    <span className={`ml-2 flex gap-2 `}>
      last
      {[...Array(3)].map((_, i) => {
        const v = 2 * i + 2;
        return (
          <span
            key={v}
            className={`hover:cursor-pointer ${
              props.animateInt === v ? "text-blue-600" : ""
            }`}
            onClick={props.intCallback}
            data-int={v}
          >
            {`${v}`}h
          </span>
        );
      })}
    </span>
  );
}

export default React.memo(AnimateOptions);
