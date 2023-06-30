import React, { useCallback, useContext, useEffect, useState } from "react";
import { ToggleLeft, ToggleRight } from "phosphor-react";
import useSWR from "swr";
// helpers
import { fetcher } from "@/helpers/constants";
import { createLinkNames } from "@/helpers/infraredHelpers";

// components
import AnimateOptions from "@/components/InfraredCard/AnimateOptions";
import SpeedOptions from "@/components/RadarCard/SpeedOptions";
import StaticLinks from "@/components/InfraredCard/StaticLinks";
import ProgressBar from "@/components/RadarCard/ProgressBar";
import ImagesList from "@/components/RadarCard/ImagesList";
import { UrlContext } from "../UrlContext/UrlContext";
import ToggleAnimation from "../RadarCard/ToggleAnimation";

const start8h = 0;
const start6h = 4;
const start1h = 14;
const baseSpeed = 1000;

function InfraredCard() {
  const API_WEATHER = useContext(UrlContext);
  const { data: data8h, isLoading: isLoading8h } = useSWR(
    `${API_WEATHER}/exist8hDataInfrared`,
    fetcher
  );

  const [animateInt, setAnimateInt] = useState(1);
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
            animateInt > 1 ? (animateInt === 6 ? start6h : start8h) : start1h
          );
        } else setSelectedTime((time) => time + 1);
      }, baseSpeed * speedMultiplier);
    }
    return () => clearInterval(timer);
  }, [shouldAnimate, selectedTime, speedMultiplier]);
  // ############# CALLBACKS
  const intCallback = useCallback((e) => {
    const animateIntNow = +e.target.dataset.int;
    setSelectedTime(
      animateIntNow > 1 ? (animateIntNow === 6 ? start6h : start8h) : start1h
    );
    setAnimateInt(+e.target.dataset.int);
  });
  const checkCallback = useCallback(() => {
    if (shouldAnimate) {
      setShouldAnimate(false);
      setLinks(createLinkNames(API_WEATHER));
      setSelectedTime(links.length - 1);
      setAnimateInt(1);
    } else {
      setShouldAnimate(true);
      setLinks(createLinkNames(API_WEATHER));
      setSelectedTime(start1h);
    }
  }, [shouldAnimate]);
  const linkCallback = useCallback((e) => {
    setSelectedTime(+e.target.getAttribute("index"));
  });

  const speedCallback = useCallback((e) => {
    setSpeedMultiplier(+e.target.dataset.speed);
  });

  return (
    <div className="mb-20 max-w-3xl rounded-md bg-stone-300 xl:mx-auto">
      <div className="flex items-center gap-1 rounded-sm text-lg md:p-2 md:text-xl">
        <span>Static</span>
        <ToggleAnimation checkCallback={checkCallback} selectedTime={selectedTime} />
        <span>Animate</span>
        {shouldAnimate && (
          <AnimateOptions
            animateInt={animateInt}
            intCallback={intCallback}
            isLoading8h={isLoading8h}
            data8h={data8h}
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
            className={`absolute top-0 z-20 flex flex-col text-lg font-semibold text-red-600`}
          >
            <ProgressBar filled={filled} />
            {links[selectedTime].time}
          </span>
        )}
        <ImagesList
          links={links}
          selectedTime={selectedTime}
          setLinks={setLinks}
          placeholder="/infrared_placeholder.webp"
        />
      </div>
    </div>
  );
}

export default InfraredCard;
