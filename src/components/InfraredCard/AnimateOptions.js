import React from "react";

function AnimateOptions(props) {
  const option6h = props.isLoading8h
    ? nul8
    : props.data8h.exists && (
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
  const option8h = props.isLoading8h
    ? null
    : props.data8h.exists && (
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
        className={`rounded-md px-1 hover:cursor-pointer ${
          props.animateInt === 1 ? "bg-stone-400 text-white" : ""
        }`}
        onClick={props.intCallback}
        data-int={1}
      >
        1h
      </span>
      {option6h}
      {option8h}
    </span>
  );
}

export default React.memo(AnimateOptions);
