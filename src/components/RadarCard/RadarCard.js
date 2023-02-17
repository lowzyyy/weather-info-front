import React, { useCallback, useEffect, useState } from "react";
import { ToggleLeft, ToggleRight } from "phosphor-react";
import useSWR from "swr";
// helpers
import { API_WEATHER } from "@/helpers/constants";
import { createLinkNames } from "@/helpers/radarHelpers";

// components
import AnimateOptions from "@/components/RadarCard/AnimateOptions";
import SpeedOptions from "@/components/RadarCard/SpeedOptions";
import StaticLinks from "@/components/RadarCard/StaticLinks";
import ProgressBar from "@/components/RadarCard/ProgressBar";
import ImagesList from "@/components/RadarCard/ImagesList";

// FIXME: EDGE CASE WHEN SELECTING ANIMATE IN TIME WHERE RHMZ IS PUSHING NEW IMAGE AND REMOVING OLD, AT 0 PLACE IMG LINK IS NOT VALID IN LINKS ARRAY
// For now just try to use latest image at exactly 10 minutes after...

const baseSpeed = 1000;
const start2h = 16;
const start4h = 8;
const start6h = 0;
function RadarCard() {
  const { data: data6h, isLoading: isLoading6h } = useSWR(
    `${API_WEATHER}/exist6hDataRadar`,
    (...args) => fetch(...args).then((res) => res.json())
  );

  const [animateInt, setAnimateInt] = useState(2);
  const [links, setLinks] = useState(() => createLinkNames());
  const [selectedTime, setSelectedTime] = useState(links.length - 1);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const filled = Math.min(Math.ceil(((selectedTime + 1) / links.length) * 100), 100);

  useEffect(() => {
    let timer;
    if (shouldAnimate) {
      timer = setTimeout(() => {
        if (selectedTime === links.length - 1)
          setSelectedTime(
            animateInt > 2 ? (animateInt === 4 ? start4h : start6h) : start2h
          );
        else setSelectedTime((time) => time + 1);
      }, baseSpeed * speedMultiplier);
    }
    return () => clearTimeout(timer);
  }, [shouldAnimate, selectedTime, speedMultiplier]);
  // ############# CALLBACKS
  const intCallback = useCallback((e) => {
    const animateIntNow = +e.target.dataset.int;
    setSelectedTime(
      animateIntNow > 2 ? (animateIntNow === 4 ? start4h : start6h) : start2h
    );
    setAnimateInt(+e.target.dataset.int);
  });
  const checkCallback = () => {
    if (shouldAnimate) {
      setShouldAnimate(false);
      setLinks(createLinkNames());
      setSelectedTime(links.length - 1);
      setAnimateInt(2);
    } else {
      setShouldAnimate(true);
      setLinks(createLinkNames());
      setSelectedTime(start2h);
    }
  };
  const linkCallback = useCallback((e) => {
    setSelectedTime(+e.target.getAttribute("index"));
  });

  const speedCallback = useCallback((e) => {
    setSpeedMultiplier(+e.target.dataset.speed);
  });
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
    <div className="mb-6 max-w-3xl rounded-md bg-stone-300 xl:mx-auto">
      <div className="flex items-center gap-1 rounded-sm text-lg md:p-2 md:text-xl ">
        <span>Static</span>
        {shouldAnimate ? rightToggle : leftToggle}
        <span>Animate</span>
        {shouldAnimate && (
          <AnimateOptions
            animateInt={animateInt}
            intCallback={intCallback}
            isLoading6h={isLoading6h}
            data6h={data6h}
          />
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
            className={`absolute top-0 z-20 flex flex-col text-lg font-semibold text-white`}
          >
            <ProgressBar filled={filled} />
            {links[selectedTime].time}
          </span>
        )}
        <ImagesList
          links={links}
          selectedTime={selectedTime}
          setLinks={setLinks}
          placeholder="/radar_placeholder.webp"
        />
      </div>
    </div>
  );
}

export default RadarCard;
