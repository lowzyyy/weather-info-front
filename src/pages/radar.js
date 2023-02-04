import { ToggleLeft, ToggleRight } from "phosphor-react";
import React, { use, useState } from "react";

const minutes15 = 900_000;
const timePartToString = (value) => {
  return value < 10 ? `0${value}` : value;
};
const createLinkNames = () => {
  const timeNow = new Date();
  const minuteReminder = timeNow.getMinutes() % 15;
  if (minuteReminder > 10)
    timeNow.setMinutes(timeNow.getMinutes() - minuteReminder);
  else timeNow.setMinutes(timeNow.getMinutes() - minuteReminder - 15);
  const endTs = timeNow.getTime();
  const startTs = endTs - 7 * minutes15;
  const links = [...Array(8)].map((t, i) => {
    const time = new Date(startTs + i * minutes15);
    const hour = timePartToString(time.getUTCHours());
    const minute = timePartToString(time.getMinutes());
    const month = timePartToString(time.getMonth() + 1);
    const day = timePartToString(time.getDate());
    const year = time.getFullYear();
    const imageName = year + month + day + hour + minute;
    return {
      time: `${timePartToString(time.getHours())}:${minute}`,
      link: `https://www.hidmet.gov.rs/data/radarska_slika/kompozit/ko${imageName}0000dBZ.cappi.png`,
    };
  });
  return links;
};

const Radar = () => {
  const links = createLinkNames();
  const [currLink, setCurrLink] = useState(links.length - 1);
  const [animateMode, setAnimateMode] = useState(false);

  const checkCallback = () => {
    if (animateMode) {
      setAnimateMode(false);
      setCurrLink(links.length - 1);
    } else {
      setAnimateMode(true);
      setCurrLink(0);
    }
  };
  const linkCallback = (e) => {
    setCurrLink(+e.target.getAttribute("index"));
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-1 rounded-sm  ">
        <span>Static</span>
        {animateMode ? (
          <ToggleRight
            className="fill-blue-500"
            onClick={checkCallback}
            size={34}
            weight="fill"
          />
        ) : (
          <ToggleLeft
            className="fill-blue-500"
            onClick={checkCallback}
            size={34}
            weight="fill"
          />
        )}
        <span>Animate</span>
      </div>
      <div className="relative">
        <ul
          className={`absolute left-16 top-1 flex w-40 flex-wrap gap-1 text-xs font-semibold text-stone-900 [&>*]:flex-shrink-0 [&>*]:basis-8 ${
            animateMode ? "hidden" : "flex"
          }`}
        >
          {links.map((l, i) => (
            <li
              className={`hover:cursor-pointer ${
                currLink === i ? " text-white" : ""
              }`}
              index={i}
              onClick={linkCallback}
              key={l.time}
              data-link={l.link}
            >
              {l.time}
            </li>
          ))}
        </ul>
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
