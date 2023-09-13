import is from "../../styles/weather-icons.min.module.css";
import { NavigationArrow } from "phosphor-react";
import { useState } from "react";
import useHideGlobal from "../../hooks/useHideGlobal";
import { computeIcon, windDirections } from "@/helpers/hourlyHelpers";
import { formatCondition } from "@/helpers/hourlyHelpers";

const HourlyItem = (props) => {
  const [visible, setVisible] = useState(false);
  const ref = useHideGlobal(setVisible);

  const time = props.hourInfo.time;
  const sunriseH = Number(props.sunTimes.sunrise.split(":")[0]);
  const sunsetH = Number(props.sunTimes.sunset.split(":")[0]);
  const nowH = Number(time);
  const condition = props.hourInfo.condition;
  const weatherIcon = computeIcon(condition, sunriseH, sunsetH, nowH);
  let middleContent;
  let bottomContent;
  const cat = props.category;
  switch (cat) {
    case "temp":
      middleContent = (
        <i
          title={`${condition}`}
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
  const conditionTooltip =
    cat === "temp" ? (
      <p
        className={`absolute left-0  animate-fadeIn ${
          visible ? "inline" : "hidden"
        }  w-15 break-words rounded-md border border-solid border-white bg-gray-700  p-1 text-center text-sm text-white`}
      >
        {formatCondition(condition)}
      </p>
    ) : null;
  return (
    <div
      className={`relative flex  w-14 shrink-0 flex-col items-center  justify-between border-solid border-black ${
        time === "00" ? " border-r border-r-white" : ""
      }`}
    >
      <span>
        {time + "h"}
        {conditionTooltip}
      </span>
      <span ref={ref}>{middleContent}</span>
      <span>{bottomContent}</span>
    </div>
  );
};

export default HourlyItem;
