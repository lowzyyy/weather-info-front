import React, { useCallback, useContext, useEffect, useState } from "react";
import { ToggleLeft, ToggleRight } from "phosphor-react";
import useSWR from "swr";
// helpers
import { fetcher } from "@/helpers/constants";
import { createLinkNames } from "@/helpers/radarHelpers";

// components
import AnimateOptions from "@/components/RadarCard/AnimateOptions";
import SpeedOptions from "@/components/RadarCard/SpeedOptions";
import StaticLinks from "@/components/RadarCard/StaticLinks";
import ProgressBar from "@/components/RadarCard/ProgressBar";
import ImagesList from "@/components/RadarCard/ImagesList";
import { UrlContext } from "../UrlContext/UrlContext";
import ToggleAnimation from "./ToggleAnimation";

// FIXME: EDGE CASE WHEN SELECTING ANIMATE IN TIME WHERE RHMZ IS PUSHING NEW IMAGE AND REMOVING OLD, AT 0 PLACE IMG LINK IS NOT VALID IN LINKS ARRAY
// For now just try to use latest image at exactly 10 minutes after...

const baseSpeed = 1000;
const start2h = 16;
const start4h = 8;
const start6h = 0;
function RadarCard() {
  const API_WEATHER = useContext(UrlContext);
  const { data: data6h, isLoading: isLoading6h } = useSWR(
    `${API_WEATHER}/exist6hDataRadar`,
    fetcher
  );
  const [animateInt, setAnimateInt] = useState(2);
  const [links, setLinks] = useState(createLinkNames(API_WEATHER));
  const [selectedTime, setSelectedTime] = useState(links.length - 1);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const filled = Math.min(Math.ceil(((selectedTime + 1) / links.length) * 100), 100);
  useEffect(() => {
    let timer;
    if (shouldAnimate) {
      timer = setInterval(() => {
        if (selectedTime >= links.length - 1) {
          setSelectedTime(
            animateInt > 2 ? (animateInt === 4 ? start4h : start6h) : start2h
          );
        } else setSelectedTime((time) => time + 1);
      }, baseSpeed * speedMultiplier);
    }
    return () => clearInterval(timer);
  }, [shouldAnimate, speedMultiplier, selectedTime]);
  // ############# CALLBACKS
  const intCallback = useCallback((e) => {
    const animateIntNow = +e.target.dataset.int;
    setSelectedTime(
      animateIntNow > 2 ? (animateIntNow === 4 ? start4h : start6h) : start2h
    );
    setAnimateInt(+e.target.dataset.int);
  });
  const checkCallback = useCallback(() => {
    if (shouldAnimate) {
      setShouldAnimate(false);
      setLinks(createLinkNames(API_WEATHER));
      setSelectedTime(links.length - 1);
      setAnimateInt(2);
    } else {
      setShouldAnimate(true);
      setLinks(createLinkNames(API_WEATHER));
      setSelectedTime(start2h);
    }
  }, [shouldAnimate]);
  const linkCallback = useCallback((e) => {
    setSelectedTime(+e.target.getAttribute("index"));
  });

  const speedCallback = useCallback((e) => {
    setSpeedMultiplier(+e.target.dataset.speed);
  });
  return (
    <div className="mb-6 max-w-3xl rounded-md bg-stone-300 xl:mx-auto">
      <div className="flex items-center gap-1 rounded-sm text-lg md:p-2 md:text-xl ">
        <span>Static</span>
        <ToggleAnimation shouldAnimate={shouldAnimate} checkCallback={checkCallback} />
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
