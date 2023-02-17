import React, { useCallback, useEffect, useState } from "react";
import { ToggleLeft, ToggleRight } from "phosphor-react";
import useSWR from "swr";
// helpers
import { API_WEATHER } from "@/helpers/constants";
import { createLinkNames } from "@/helpers/infraredHelpers";

// components
import AnimateOptions from "@/components/InfraredCard/AnimateOptions";
import SpeedOptions from "@/components/RadarCard/SpeedOptions";
import StaticLinks from "@/components/InfraredCard/StaticLinks";
import ProgressBar from "@/components/RadarCard/ProgressBar";
import ImagesList from "@/components/RadarCard/ImagesList";

const start8h = 0;
const start6h = 4;
const start1h = 14;
const baseSpeed = 1000;

function InfraredCard() {
  const { data: data8h, isLoading: isLoading8h } = useSWR(
    `${API_WEATHER}/exist8hDataInfrared`,
    (...args) => fetch(...args).then((res) => res.json())
  );

  const [animateInt, setAnimateInt] = useState(1);
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
            animateInt > 1 ? (animateInt === 6 ? start6h : start8h) : start1h
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
      animateIntNow > 1 ? (animateIntNow === 6 ? start6h : start8h) : start1h
    );
    setAnimateInt(+e.target.dataset.int);
  });
  const checkCallback = () => {
    if (shouldAnimate) {
      setShouldAnimate(false);
      setLinks(createLinkNames());
      setSelectedTime(links.length - 1);
      setAnimateInt(1);
    } else {
      setShouldAnimate(true);
      setLinks(createLinkNames());
      setSelectedTime(start1h);
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
    <div className="mb-20 w-full">
      <div className="flex items-center gap-1 rounded-sm text-lg  ">
        <span>Static</span>
        {shouldAnimate ? rightToggle : leftToggle}
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
