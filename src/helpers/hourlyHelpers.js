const defaultWindPosition = 140;

export const windDirections = {
  N: `rotate-[-130deg]`,
  NNE: `rotate-[-107.5deg]`,
  NE: `rotate-[-85deg]`,
  ENE: `rotate-[-62.5deg]`,
  E: `rotate-[-40deg]`,
  ESE: `rotate-[-17.5deg]`,
  SE: `rotate-[5deg]`,
  SSE: `rotate-[27.5deg]`,
  S: `rotate-[50deg]`,
  SSW: `rotate-[72.5deg]`,
  SW: `rotate-[95deg]`,
  WSW: `rotate-[117.5deg]`,
  W: `rotate-[140deg]`,
  WNW: `rotate-[165.5deg]`,
  NW: `rotate-[185deg]`,
  NNW: "rotate-[207.5deg]",
};

export const computeWindDirection = (stringDirection) => {
  let rotateDegree;
  switch (stringDirection) {
    case "N":
      rotateDegree = 270;
      break;
    case "NNE":
      rotateDegree = 248.5;
      break;
    case "NE":
      rotateDegree = 225;
      break;
    case "ENE":
      rotateDegree = 202.5;
      break;
    case "E":
      rotateDegree = 180;
      break;
    case "ESE":
      rotateDegree = 157.5;
      break;
    case "SE":
      rotateDegree = 135;
      break;
    case "SSE":
      rotateDegree = 112.5;
      break;
    case "S":
      rotateDegree = 90;
      break;
    case "SSW":
      rotateDegree = 67.5;
      break;
    case "SW":
      rotateDegree = 45;
      break;
    case "WSW":
      rotateDegree = 22.5;
      break;
    case "W":
      rotateDegree = 0;
      break;
    case "WNW":
      rotateDegree = -22.5;
      break;
    case "WNW":
      rotateDegree = -22.5;
      break;
    case "NW":
      rotateDegree = -45;
      break;
    case "NNW":
      rotateDegree = -67.5;
      break;
    default:
      break;
  }
  return rotateDegree - defaultWindPosition;
};

export const formatCondition = (cond) => {
  return cond
    .replaceAll("am", "")
    .replaceAll("pm", "")
    .split("/")
    .map((el) => el.trim().split(" ").join("-"))
    .join(" ");
};

export const computeIcon = (cond, ...args) => {
  const condition = formatCondition(cond.toLowerCase());
  const numOfConditions = condition.split(" ").length;
  // console.log(condition);
  let iconPart;
  if (args.length === 1) {
    const [day] = args;
    iconPart = day ? "wi-day" : "wi-night-alt";
  } else {
    const [sunriseH, sunsetH, nowH] = args;
    iconPart = nowH >= sunriseH && nowH < sunsetH ? "wi-day" : "wi-night-alt";
  }
  // console.log(condition);
  if (numOfConditions === 1) {
    // sunny or clear
    if (condition === "sunny") return "wi-day-sunny";
    if (condition === "mostly-sunny") return "wi-day-sunny-overcast";
    if (condition === "clear") return "wi-night-clear";
    if (condition === "mostly-clear") return "wi-night-alt-partly-cloudy";
    // cloudy
    if (condition === "partly-cloudy") return `${iconPart}-cloudy`;
    if (condition === "mostly-cloudy") return "wi-cloudy";
    if (condition === "cloudy") return "wi-cloud";
    // thunderstorms
    if (condition === "thundershowers") return "wi-storm-showers";
    if (condition === "thunderstorms") return "wi-thunderstorm";
    if (condition === "scattered-thunderstorms" || condition === "isolated-thunderstorms")
      return "wi-day-storm-showers";

    // rain
    if (condition === "rain") return "wi-rain";
    if (
      condition === "scattered-showers" ||
      condition === "showers" ||
      condition === "rain-showers"
    )
      return "wi-showers";
    if (condition === "light-rain" || condition === "few-showers") return "wi-sprinkle";
    // snow
    if (
      condition === "light-snow" ||
      condition === "snow-showers" ||
      condition === "few-snow-showers"
    )
      return "wi-snow";
    if (condition === "snow") return "wi-snowflake-cold";
    // sleet
    if (condition === "wintry-mix") return "wi-sleet";
  }
  if (numOfConditions === 2) {
    // sunny wind

    if (condition === "mostly-sunny wind" || condition === "sunny wind")
      return "wi-day-windy";
    //cloud wind
    if (condition === "cloudy wind" || condition === "mostly-cloudy wind")
      return "wi-cloudy-gusts";
    if (condition === "partly-cloudy wind") return `${iconPart}-cloudy-gusts`;
    // rain wind
    if (
      condition === "rain wind" ||
      condition === "showers wind" ||
      condition === "light-rain wind"
    )
      return "wi-rain-wind";

    // snow wind
    if (
      condition === "snow-showers wind" ||
      condition === "light-snow wind" ||
      condition === "snow wind"
    )
      return "wi-snow-wind";
    // rain snow mix
    if (
      condition === "rain snow" ||
      condition === "rain light-snow" ||
      condition === "rain snow-showers" ||
      condition === "ligh-rain snow" ||
      condition === "light-rain light-snow"
    )
      return "wi-rain-mix";
    // rain thunder
    if (condition === "rain thunder") return "wi-thunderstorm";
    // ##### AM-PM cases
    // clouds sun
    if (condition === "clouds sun" || condition === "sun clouds") return "wi-day-cloudy";
  }

  if (numOfConditions === 3) {
    if (condition === "rain wind snow" || condition === "rain snow wind")
      return "wi-rain-mix";
  }
};
