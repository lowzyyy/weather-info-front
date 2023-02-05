import React, { useCallback, useEffect, useState } from "react";
import { ToggleLeft, ToggleRight } from "phosphor-react";

// helpers
import { createLinkNames } from "@/helpers/radarHelpers";

// components
import AnimateOptions from "@/components/Radar/AnimateOptions";
import SpeedOptions from "@/components/Radar/SpeedOptions";
import StaticLinks from "@/components/Radar/StaticLinks";
import ProgressBar from "@/components/Radar/ProgressBar";
import ImagesList from "@/components/Radar/ImagesList";

// FIXME: EDGE CASE WHEN SELECTING ANIMATE IN TIME WHERE RHMZ IS PUSHING NEW IMAGE AND REMOVING OLD, AT 0 PLACE IMG LINK IS NOT VALID IN LINKS ARRAY
// For now just try to use latest image at exactly 10 minutes after...
const animationType = {
  0.75: "animate-[fadeOutRadar_0.8s_forwards]",
  1: "animate-[fadeOutRadar_1.1s_forwards]",
  1.25: "animate-[fadeOutRadar_1.4s_forwards]",
};
const baseSpeed = 1000;
const Radar = () => {
  const allLinks = createLinkNames();
  const [animateInt, setAnimateInt] = useState(2);
  const links = allLinks.slice(allLinks.length - animateInt * 4);
  const [selectedTime, setSelectedTime] = useState(links.length - 1);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  const animation = shouldAnimate ? animationType[speedMultiplier] : "";
  const filled = Math.min(Math.ceil(((selectedTime + 1) / links.length) * 100), 100);
  useEffect(() => {
    let timer;
    if (shouldAnimate) {
      timer = setTimeout(() => {
        if (selectedTime === links.length - 1) setSelectedTime(0);
        else setSelectedTime((time) => time + 1);
      }, baseSpeed * speedMultiplier);
    }
    return () => clearTimeout(timer);
  }, [shouldAnimate, selectedTime, speedMultiplier]);
  const intCallback = useCallback((e) => {
    setAnimateInt(+e.target.dataset.int);
  });
  const checkCallback = () => {
    if (shouldAnimate) {
      setShouldAnimate(false);
      setSelectedTime(links.length - 1);
      setAnimateInt(2);
    } else {
      setShouldAnimate(true);
      setSelectedTime(0);
    }
  };
  const linkCallback = useCallback((e) => {
    setSelectedTime(+e.target.getAttribute("index"));
  });

  const speedCallback = (e) => {
    setSpeedMultiplier(+e.target.dataset.speed);
  };
  const rightToggle = (
    <ToggleRight
      className="fill-blue-500"
      onClick={checkCallback}
      size={35}
      weight="fill"
    />
  );
  const leftToggle = (
    <ToggleLeft
      className="fill-blue-500"
      onClick={checkCallback}
      size={35}
      weight="fill"
    />
  );
  return (
    <div className="w-full">
      <div className="flex items-center gap-1 rounded-sm text-lg  ">
        <span>Static</span>
        {shouldAnimate ? rightToggle : leftToggle}
        <span>Animate</span>
        {shouldAnimate && (
          <AnimateOptions animateInt={animateInt} intCallback={intCallback} />
        )}
      </div>
      {shouldAnimate && (
        <SpeedOptions speedMultiplier={speedMultiplier} speedCallback={speedCallback} />
      )}
      <div className="relative rounded-md">
        {!shouldAnimate && (
          <StaticLinks
            links={links}
            selectedTime={selectedTime}
            linkCallback={linkCallback}
          />
        )}
        {shouldAnimate && (
          <span
            className={`absolute top-0 z-10 flex flex-col text-lg font-semibold text-white`}
          >
            <ProgressBar filled={filled} />
            {links[selectedTime].time}
          </span>
        )}
        <ImagesList links={links} selectedTime={selectedTime} animation={animation} />
      </div>
    </div>
  );
};

export default Radar;
