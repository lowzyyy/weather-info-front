import React, { use, useState } from "react";

const minutes15 = 900_000;
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
    const hour = time.getHours();
    const minute =
      time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
    const month =
      time.getMonth() + 1 < 10
        ? `0${time.getMonth() + 1}`
        : time.getMonth() + 1;
    const day = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();
    const year = time.getFullYear();
    const imageName = year + month + day + (hour - 1) + minute;
    return {
      time: `${hour}:${minute}`,
      link: `https://www.hidmet.gov.rs/data/radarska_slika/kompozit/ko${imageName}0000dBZ.cappi.png`,
    };
  });
  return links;
};

const Radar = () => {
  const links = createLinkNames();
  const [imgLink, setImgLink] = useState(links[links.length - 1].link);
  const [currLink, setCurrLink] = useState(links.length - 1);
  const linkCallback = (e) => {
    setImgLink(e.target.dataset.link);
    setCurrLink(+e.target.getAttribute("index"));
  };

  return (
    <div className="w-full">
      <div className="relative">
        <ul className="absolute left-16 top-1 flex w-40 flex-wrap gap-1 text-xs font-semibold text-stone-900 [&>*]:flex-shrink-0 [&>*]:basis-8   ">
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
        <img src={imgLink} />
      </div>
    </div>
  );
};

export default Radar;
