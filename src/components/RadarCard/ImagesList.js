import React from "react";

// 765x565 image size
function ImagesList(props) {
  return (
    <>
      {props.links.map((l, i) => {
        return (
          <img
            key={i}
            className={`absolute w-full rounded-md ${
              props.selectedTime === i ? `z-10 opacity-100 ` : "z-0 opacity-0"
            }`}
            src={`${l.link}`}
            alt="Radar image"
          />
        );
      })}
      <img
        className="invisible w-full"
        src={props.placeholder}
        alt="img used to give div height"
      />
    </>
  );
}

export default React.memo(ImagesList);
