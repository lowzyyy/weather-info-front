import AnimateOptions from "@/components/Radar/AnimateOptions";
import StaticLinks from "@/components/Radar/StaticLinks";
import { ToggleLeft, ToggleRight } from "phosphor-react";
import React, { useCallback, useState } from "react";

// FIXME: EDGE CASE WHEN SELECTING ANIMATE IN TIME WHERE RHMZ IS PUSHING NEW IMAGE AND REMOVING OLD, AT 0 PLACE IMG LINK IS NOT VALID IN LINKS ARRAY
const minutes15 = 900_000;
const timePartToString = (value) => {
  return value < 10 ? `0${value}` : value;
};
const createLinkNames = () => {
  const history = 24; //last 6h
  const timeNow = new Date();
  const minuteReminder = timeNow.getMinutes() % 15;
  if (minuteReminder > 10)
    timeNow.setMinutes(timeNow.getMinutes() - minuteReminder);
  else timeNow.setMinutes(timeNow.getMinutes() - minuteReminder - 15);
  const endTs = timeNow.getTime();
  const startTs = endTs - (history - 1) * minutes15;
  const links = [...Array(history)].map((t, i) => {
    const time = new Date(startTs + i * minutes15);
    const hour = timePartToString(time.getUTCHours());
    const minute = timePartToString(time.getMinutes());
    const month = timePartToString(time.getUTCMonth() + 1);
    const day = timePartToString(time.getUTCDate());
    const year = time.getUTCFullYear();
    const imageName = year + month + day + hour + minute;
    return {
      time: `${timePartToString(time.getHours())}:${minute}`,
      link: `https://www.hidmet.gov.rs/data/radarska_slika/kompozit/ko${imageName}0000dBZ.cappi.png`,
    };
  });
  return links;
};

const Radar = () => {
  const allLinks = createLinkNames();
  const links = allLinks.slice(allLinks.length - 8);
  const [currLink, setCurrLink] = useState(links.length - 1);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [animateInt, setAnimateInt] = useState(2);

  const intCallback = (e) => {
    setAnimateInt(+e.target.dataset.int);
  };
  const checkCallback = () => {
    if (shouldAnimate) {
      setShouldAnimate(false);
      setCurrLink(links.length - 1);
    } else {
      setShouldAnimate(true);
      setCurrLink(0);
    }
  };
  const linkCallback = useCallback((e) => {
    setCurrLink(+e.target.getAttribute("index"));
  });

  const rightToggle = (
    <ToggleRight
      className="fill-blue-500"
      onClick={checkCallback}
      size={34}
      weight="fill"
    />
  );
  const leftToggle = (
    <ToggleLeft
      className="fill-blue-500"
      onClick={checkCallback}
      size={34}
      weight="fill"
    />
  );
  return (
    <div className="w-full">
      <div className="flex items-center gap-1 rounded-sm  ">
        <span>Static</span>
        {shouldAnimate ? rightToggle : leftToggle}
        <span>Animate</span>
        {shouldAnimate && (
          <AnimateOptions animateInt={animateInt} intCallback={intCallback} />
        )}
      </div>
      <div className="relative">
        {!shouldAnimate && (
          <StaticLinks
            links={links}
            currLink={currLink}
            linkCallback={linkCallback}
          />
        )}
        {links.map((l, i) => {
          return (
            <img
              key={i}
              className={`${currLink === i ? "inline" : "hidden"}`}
              src={`${l.link}`}
            ></img>
          );
        })}
      </div>
    </div>
  );
};

export default Radar;
