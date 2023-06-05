import React from "react";

function IntervalOptions(props) {
  const bgColor = "bg-indigo-200";
  const optionsList = [
    <button
      className={`rounded-md border border-black p-1 text-sm ${
        props.selectedInt === 60 ? `${bgColor}` : ""
      }`}
      onClick={props.dataCallback}
      data-interval={60}
      key={2}
    >
      60 days
    </button>,
    <button
      className={`rounded-md border border-black p-1 text-sm ${
        props.selectedInt === 90 ? `${bgColor}` : ""
      }`}
      onClick={props.dataCallback}
      data-interval={90}
      key={3}
    >
      90 days
    </button>,
    <button
      className={`rounded-md border border-black p-1 text-sm ${
        props.selectedInt === 180 ? `${bgColor}` : ""
      }`}
      onClick={props.dataCallback}
      data-interval={180}
      key={4}
    >
      6 months
    </button>,
    <button
      className={`rounded-md border border-black p-1 text-sm ${
        props.selectedInt === 365 ? `${bgColor}` : ""
      }`}
      onClick={props.dataCallback}
      data-interval={365}
      key={5}
    >
      1 year
    </button>,
  ];
  return (
    <div className="mb-2 flex gap-2 md:mb-4">
      <button
        className={`rounded-md border border-black p-1 text-sm ${
          props.selectedInt === 30 ? `${bgColor}` : ""
        }`}
        onClick={props.dataCallback}
        data-interval={30}
      >
        30 days
      </button>
      {optionsList.filter((el) => {
        return +el.props["data-interval"] <= props.levelsLength;
      })}
    </div>
  );
}

export default React.memo(IntervalOptions);
