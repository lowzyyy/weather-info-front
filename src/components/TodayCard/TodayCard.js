import is from "../../styles/weather-icons.min.module.css";
import { ArrowDown, ArrowUp, NavigationArrow } from "phosphor-react";
import useSWR from "swr";
import HourlySection from "./HourlySection";
// import { API_WEATHER } from "@/helpers/constants";
import { useContext, useEffect, useState } from "react";
import { UrlContext } from "../UrlContext/UrlContext";
import { fetcher } from "@/helpers/constants";
import { getPollutionColors, pollutionColors } from "@/helpers/hourlyHelpers";
import { Tooltip } from "react-tooltip";

const TodayCard = () => {
  const API_WEATHER = useContext(UrlContext);

  const [showAirPolution, setShowAirPollution] = useState(false);
  useEffect(() => {
    setShowAirPollution(
      localStorage.getItem("showPollution") === "true" ? true : false
    );
  }, []);

  const {
    data: todayData,
    error: todayError,
    isLoading: isLoadingToday,
  } = useSWR(`${API_WEATHER}/today`, fetcher);

  if (isLoadingToday)
    return <p className="max-w-3xl md:mx-auto">LOADING TODAY....</p>;
  if (todayError) return <p className="max-w-3xl md:mx-auto">ERROR TODAY...</p>;
  const sunTimes = {
    sunset: todayData.sunsetTime,
    sunrise: todayData.sunriseTime,
  };

  return (
    <section
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.212), rgba(0, 0, 0, 0.233)), url(${todayData.backgroundImageUrl}) center/cover no-repeat`,
      }}
      className={`mb-5 w-full max-w-3xl  rounded-md p-2 text-white md:mx-auto md:p-4`}
    >
      <div className="mb-10 flex flex-wrap items-end justify-between">
        <span className="text-4xl">
          Now {`${todayData.currentTemperature}`}
        </span>

        <span className="px-1 text-2xl">{`${todayData.condition}`}</span>
      </div>
      <div className="flex-shrink-1 mb-1 flex flex-wrap justify-between [&>*]:mb-1 [&>*]:basis-[45%]">
        {/* LEFT SECTION */}
        <div className="[&>*]:mb-2 [&>*]:flex  [&>*]:justify-between">
          <div className=" text-lg">
            High/Low
            <span>
              {todayData.highTemperature}/{todayData.lowTemperature}
            </span>
          </div>
          <div className="text-lg">
            Humidity <span>{`${todayData.humidity}`}</span>
          </div>
          <div className="flex items-center text-lg">
            Wind
            <span className="flex items-center">
              <NavigationArrow
                size={18}
                weight="regular"
                className={`inline`}
                style={{ transform: `rotate(${todayData.windDirection}deg)` }}
              />
              {`${todayData.windSpeed} `}
            </span>
          </div>
        </div>
        {/* RIGHT SECTION */}
        <div className="[&>*]:mb-2 [&>*]:flex [&>*]:justify-between">
          <div className="text-lg">
            Sunrise <span>{`${todayData.sunriseTime}`}</span>
          </div>
          <div className="text-lg">
            Sunset <span>{`${todayData.sunsetTime}`} </span>
          </div>
          <div className="text-lg">
            Moon Phase
            <span className="flex items-center ">
              <i
                title={`${todayData.moonPhase}`}
                className={`${is.wi} ${
                  is[`wi-moon-alt-${todayData.moonPhase}`]
                }  z-10 text-2xl text-black`}
              ></i>
              <svg width="18" height="18" className="absolute z-[0]">
                <circle cx="9" cy="9" r="8" strokeWidth="1" fill="white" />
              </svg>
            </span>
          </div>
        </div>
      </div>
      {todayData.pollutionData?.length > 0 && (
        <div className="mb-5 flex flex-col pt-1 text-lg ">
          <div
            className="flex cursor-pointer items-center justify-between"
            onClick={() => {
              localStorage.setItem("showPollution", !showAirPolution);
              setShowAirPollution((value) => !value);
            }}
          >
            <span className="flex items-center gap-1">
              Air pollution
              <span>
                {showAirPolution ? (
                  <ArrowUp className="text-cyan-300" />
                ) : (
                  <ArrowDown className="text-cyan-300" />
                )}
              </span>
            </span>
            <span className="text-base text-gray-200">
              Updated:{" "}
              {todayData.pollutionData.find((el) => el.type === "time").value}
            </span>
          </div>

          {showAirPolution && (
            <>
              <div className="mt-1 flex flex-wrap justify-between">
                {todayData.pollutionData.map((data) => {
                  if (data.type === "time") return null;
                  return (
                    <div
                      key={data.type}
                      className="flex w-[45%] items-center justify-between"
                    >
                      <span>{data.type}</span>
                      <span
                        className="flex min-w-[42px] justify-end"
                        data-tooltip-id={`${data.type}`}
                        style={{
                          color: getPollutionColors(data.type, data.value),
                        }}
                      >
                        {data.value}
                      </span>
                      <Tooltip
                        id={`${data.type}`}
                        content={getPollutionColors(
                          data.type,
                          data.value,
                          true
                        )}
                        place="top"
                        openOnClick
                      />
                    </div>
                  );
                })}
              </div>
              <div className="mt-1 flex h-1">
                {pollutionColors.map((pollutionColor) => {
                  return (
                    <div
                      key={pollutionColor}
                      className="w-full"
                      style={{
                        backgroundColor: pollutionColor,
                      }}
                    ></div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
      <HourlySection sunTimes={sunTimes}></HourlySection>
    </section>
  );
};

export default TodayCard;
