import React from "react";
import useSWR from "swr";

import { API_WEATHER } from "@/helpers/constants";

function AnimateOptions(props) {
  const option4h = props.isLoading6h
    ? null
    : props.data6h.exists && (
        <span
          className={`rounded-md px-1 hover:cursor-pointer ${
            props.animateInt === 6 ? "bg-stone-400 text-white" : ""
          }`}
          onClick={props.intCallback}
          data-int={6}
        >
          6h
        </span>
      );
  const option6h = props.isLoading6h
    ? null
    : props.data6h.exists && (
        <span
          className={`rounded-md px-1 hover:cursor-pointer ${
            props.animateInt === 8 ? "bg-stone-400 text-white" : ""
          }`}
          onClick={props.intCallback}
          data-int={8}
        >
          8h
        </span>
      );

  return (
    <span className={`ml-2 flex animate-fadeIn gap-3`}>
      last
      <span
        key={2}
        className={`rounded-md px-1 hover:cursor-pointer ${
          props.animateInt === 1 ? "bg-stone-400 text-white" : ""
        }`}
        onClick={props.intCallback}
        data-int={1}
      >
        1h
      </span>
      {option4h}
      {option6h}
    </span>
  );
}

export default React.memo(AnimateOptions);
