import React from "react";
// 765x565 image size
function ImagesList(props) {
  return (
    <>
      {props.links.map((l, i) => {
        return (
          // <img
          //   key={i}
          //   className={`absolute rounded-sm ${
          //     props.selectedTime === i
          //       ? `z-10 opacity-100 ${props.animation}`
          //       : "z-0 opacity-0"
          //   }`}
          //   src={`${l.link}`}
          //   alt="Radar image"
          // />
          <picture
            className={`absolute rounded-sm ${
              props.selectedTime === i ? `z-10 opacity-100` : "z-0 opacity-0"
            }`}
          >
            <source srcSet={`${l.link}`} />
            <img src="../../../public/radarska_fallback.png" />
          </picture>
        );
      })}
    </>
  );
}

export default React.memo(ImagesList);
