import is from "../../styles/weather-icons.min.module.css";
import { NavigationArrow } from "phosphor-react";
import useSWR from "swr";
import HourlySection from "./HourlySection";
import { API_WEATHER } from "@/helpers/constants";
const TodayCard = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: todayData,
    error: todayError,
    isLoading: isLoadingToday,
  } = useSWR(`${API_WEATHER}/today`, fetcher);

  if (isLoadingToday) return <p>LOADING TODAY....</p>;
  if (todayError) return <p>ERROR TODAY...</p>;
  const sunTimes = {
    sunset: todayData.sunsetTime,
    sunrise: todayData.sunriseTime,
  };

  return (
    <section
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.212), rgba(0, 0, 0, 0.233)), url(${todayData.backgroundImageUrl})`,
      }}
      className={`mb-5 w-full max-w-3xl  rounded-md bg-cover p-2 text-white md:mx-auto md:p-4`}
    >
      <div className="mb-10 flex items-end justify-between">
        <span className="text-4xl">Now {`${todayData.currentTemperature}`}</span>

        <span className="px-1 text-2xl">{`${todayData.condition}`}</span>
      </div>
      <div className="flex-shrink-1 mb-10 flex flex-wrap justify-between [&>*]:mb-2 [&>*]:basis-[45%]">
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

      <HourlySection sunTimes={sunTimes}></HourlySection>
    </section>
  );
};

export default TodayCard;
