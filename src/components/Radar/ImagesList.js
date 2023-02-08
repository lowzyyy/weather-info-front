import React, { useEffect, useState } from "react";

// 765x565

function ImagesList(props) {
  // const [imgWidth, setImgWidth] = useState(300);
  // useEffect(() => {
  //   window.addEventListener("resize", resizeListener);
  //   resizeListener();
  //   return () => window.removeEventListener("resize", resizeListener);
  // }, []);
  // const resizeListener = () => {
  //   setImgWidth(Math.min(window.innerWidth, 760));
  // };

  return (
    <>
      {props.links.map((l, i) => {
        return (
          <img
            key={i}
            className={`${
              props.selectedTime === i
                ? `z-10 opacity-100 ${props.animation}`
                : " z-0 opacity-0"
            } absolute  rounded-sm `}
            src={`${l.link}`}
            alt="Radar image"
          />
        );
      })}
    </>
  );
}

export default React.memo(ImagesList);
