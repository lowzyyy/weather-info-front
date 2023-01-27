import is from "../../styles/weather-icons.min.module.css";
import { NavigationArrow } from "phosphor-react";
import { computeIcon, windDirections } from "@/helpers/hourlyHelpers";

const HourlyItem = (props) => {
  const time = props.hourInfo.time;
  const sunriseH = Number(props.sunTimes.sunrise.split(":")[0]);
  const sunsetH = Number(props.sunTimes.sunset.split(":")[0]);
  const nowH = Number(time);
  const weatherIcon = computeIcon(
    props.hourInfo.condition,
    sunriseH,
    sunsetH,
    nowH
  );

  let middleContent;
  let bottomContent;
  const cat = props.category;
  switch (cat) {
    case "temp":
      middleContent = (
        <i
          title={`${props.hourInfo.condition}`}
          className={`${is.wi} ${is[`${weatherIcon}`]} text-xl text-cyan-300`}
        ></i>
      );
      bottomContent = props.hourInfo.temperature;
      break;
    case "wind":
      middleContent = (
        <NavigationArrow
          size={18}
          weight="regular"
          className={`inline ${
            windDirections[props.hourInfo.windDirection]
          } text-cyan-200`}
        />
      );
      bottomContent = props.hourInfo.wind;
      break;
    case "humid":
      middleContent = (
        <i
          className={`${is.wi} ${is["wi-humidity"]} text-xl text-cyan-300`}
        ></i>
      );
      bottomContent = props.hourInfo.humidity;
      break;
    case "precip":
      middleContent = (
        <i
          className={`${is.wi} ${is["wi-raindrop"]} text-xl text-cyan-300`}
        ></i>
      );
      bottomContent = props.hourInfo.precip;
      break;
    case "cloud":
      middleContent = (
        <i className={`${is.wi} ${is["wi-cloud"]} text-xl text-cyan-300`}></i>
      );
      bottomContent = props.hourInfo.cloudCover;
      break;
    default:
      break;
  }
  return (
    <div
      className={`flex w-14  shrink-0 flex-col items-center justify-between  border-solid border-black ${
        time === "00" ? " border-r border-r-white" : ""
      }`}
    >
      <span>{time + "h"}</span>
      <span>{middleContent}</span>
      <span>{bottomContent}</span>
    </div>
  );
};

export default HourlyItem;
