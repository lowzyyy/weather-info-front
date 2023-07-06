import useGetImagesLink from "@/hooks/useGetImagesLink";
import React, { useEffect, useState } from "react";

// 765x565 image size

function ImagesList(props) {
  // const { data, isLoading } = useGetImagesLink(props.links);
  // const linksAvailable = props.links
  //   .slice(
  //     props.links.findIndex(
  //       (el) => el.link.includes("hidmet") || el.link.includes("sat24")
  //     )
  //   )
  //   .map((el) => el.link);
  // const linksFixed = data ? [...data, ...linksAvailable] : linksAvailable;
  // if (isLoading)
  //   return (
  //     <div>
  //       <p>LOADING</p>
  //       <img
  //         className="invisible w-full"
  //         src={props.placeholder}
  //         alt="img used to give div height"
  //       />
  //     </div>
  //   );
  return (
    <>
      {props.links.map((l, i) => {
        return (
          <img
            key={i}
            className={`absolute w-full rounded-md ${
              props.selectedTime === i ? `z-10 opacity-100 ` : "z-0 opacity-0"
            }`}
            src={`${l}`}
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
