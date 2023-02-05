import React from "react";

function ImagesList(props) {
  return (
    <>
      {props.links.map((l, i) => {
        return (
          <img
            key={i}
            className={`${props.selectedTime === i ? "inline" : "hidden"} ${
              props.animation
            } rounded-sm`}
            src={`${l.link}`}
          ></img>
        );
      })}
    </>
  );
}

export default ImagesList;
