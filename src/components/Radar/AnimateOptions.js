import React from "react";
import useSWR from "swr";

import { API_WEATHER } from "@/helpers/constants";

function AnimateOptions(props) {
  const { data: data4h, isLoading: isLoading4h } = useSWR(
    `${API_WEATHER}/exist4hData`,
    (...args) => fetch(...args).then((res) => res.json())
  );
  const { data: data6h, isLoading: isLoading6h } = useSWR(
    `${API_WEATHER}/exist6hData`,
    (...args) => fetch(...args).then((res) => res.json())
  );
  const option4h = isLoading4h
    ? null
    : data4h.exists && (
        <span
          key={4}
          className={`rounded-md px-1 hover:cursor-pointer ${
            props.animateInt === 4 ? "bg-stone-400 text-white" : ""
          }`}
          onClick={props.intCallback}
          data-int={4}
        >
          4h
        </span>
      );
  const option6h = isLoading6h
    ? null
    : data6h.exists && (
        <span
          key={6}
          className={`rounded-md px-1 hover:cursor-pointer ${
            props.animateInt === 6 ? "bg-stone-400 text-white" : ""
          }`}
          onClick={props.intCallback}
          data-int={6}
        >
          6h
        </span>
      );

  return (
    <span className={`ml-2 flex animate-fadeIn gap-3`}>
      last
      <span
        key={2}
        className={`rounded-md px-1 hover:cursor-pointer ${
          props.animateInt === 2 ? "bg-stone-400 text-white" : ""
        }`}
        onClick={props.intCallback}
        data-int={2}
      >
        2h
      </span>
      {option4h}
      {option6h}
    </span>
  );
}

export default React.memo(AnimateOptions);
