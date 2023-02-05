import React from "react";
import Image from "next/image";

function ImagesList(props) {
  return (
    <>
      {props.links.map((l, i) => {
        return (
          <Image
            key={i}
            className={`${props.selectedTime === i ? "inline" : "hidden"} ${
              props.animation
            } rounded-sm`}
            src={`${l.link}`}
            alt="Radar image"
            width={765}
            height={565}
            priority={i < 4 ? true : false}
          ></Image>
        );
      })}
    </>
  );
}

export default ImagesList;
