import React from "react";
import is from "../../styles/weather-icons.min.module.css";

import { computeIcon } from "@/helpers/hourlyHelpers";
import { NavigationArrow } from "phosphor-react";
import { windDirections } from "@/helpers/hourlyHelpers";

const SelectedDay = (props) => {
  const dayInfo = props.dayInfo;
  const dayIcon = computeIcon(dayInfo.dayPrecipType, true);
  const nightIcon = computeIcon(dayInfo.nightPrecipType, false);
  return (
    <>
      <div className="mb-10 flex items-end justify-between">
        <span className="text-4xl font-semibold">{dayInfo.date}</span>

        <span className="flex gap-5 px-1 text-3xl">
          <span>
            <span className="text-orange-300">H</span>
            <span className="font-extralight text-orange-100">/</span>
            <span className="text-orange-200">L</span>
          </span>
          <span>
            <span className="text-orange-300">{`${dayInfo.highTemperature}`}</span>
            <span className="font-extralight text-orange-100">/</span>
            <span className="text-orange-200">{`${dayInfo.lowTemperature}`}</span>
          </span>
        </span>
      </div>
      <div className="flex-shrink-1 mb-10 flex flex-wrap justify-between [&>*]:mb-2 [&>*]:basis-[45%]">
        {/* LEFT SECTION */}
        <div className="[&>*]:mb-2 [&>*]:flex  [&>*]:justify-between">
          <div className="text-3xl font-semibold">Day</div>
          <div className=" text-base font-semibold text-amber-200">
            <span>{dayInfo.dayCondition}</span>
          </div>
          <div className="text-lg">
            Precip
            <span className="flex items-center gap-2">
              <i
                title={`${dayInfo.dayPrecipType}`}
                className={`${is.wi} ${is[`${dayIcon}`]}   text-2xl text-cyan-200`}
              ></i>
              {` ${dayInfo.dayPrecip}`}
            </span>
          </div>
          <div className="text-lg">
            Humidity <span>{`${dayInfo.dayHumidity}`}</span>
          </div>
          <div className="flex items-center text-lg">
            Wind
            <span className="flex items-center">
              <NavigationArrow
                size={18}
                weight="regular"
                className={`inline ${windDirections[dayInfo.dayWindDirection]}`}
              />
              {`${dayInfo.dayWindSpeed} `}
            </span>
          </div>
          <div className="text-lg">
            Sunrise <span>{`${dayInfo.sunriseTime}`}</span>
          </div>
          <div className="text-lg">
            Sunset <span>{`${dayInfo.sunsetTime}`} </span>
          </div>
        </div>
        {/* RIGHT SECTION */}
        <div className="[&>*]:mb-2 [&>*]:flex  [&>*]:justify-between">
          <div className="text-3xl font-semibold">Night</div>
          <div className=" text-base font-semibold text-amber-200 ">
            <span>{dayInfo.nightCondition}</span>
          </div>
          <div className="text-lg">
            Precip
            <span className="flex items-center gap-2">
              <i
                title={`${dayInfo.nightPrecipType}`}
                className={`${is.wi} ${is[`${nightIcon}`]}   text-2xl text-cyan-200`}
              ></i>
              {` ${dayInfo.nightPrecip}`}
            </span>
          </div>
          <div className="text-lg">
            Humidity <span>{`${dayInfo.nightHumidity}`}</span>
          </div>
          <div className="flex items-center text-lg">
            Wind
            <span className="flex items-center">
              <NavigationArrow
                size={18}
                weight="regular"
                className={`inline ${windDirections[dayInfo.nightWindDirection]}`}
              />
              {`${dayInfo.nightWindSpeed} `}
            </span>
          </div>
          <div className="text-lg">
            Moon Phase
            <span className="flex items-center ">
              <i
                title={`${dayInfo.moonPhase}`}
                className={`${is.wi} ${
                  is[`wi-moon-alt-${dayInfo.moonPhase}`]
                }  z-10 text-2xl text-black`}
              ></i>
              <svg width="18" height="18" className="absolute z-[0]">
                <circle cx="9" cy="9" r="8" strokeWidth="1" fill="white" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectedDay;
