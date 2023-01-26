const defaultWindPosition = 140;

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

export const computeIcon = (cond, ...args) => {
  const condition = cond.toLowerCase();

  let iconPart;
  if (args.length === 1) {
    const [day] = args;
    iconPart = day ? "wi-day" : "wi-night-alt";
  } else {
    const [sunriseH, sunsetH, nowH] = args;
    iconPart = nowH >= sunriseH && nowH < sunsetH ? "wi-day" : "wi-night-alt";
  }

  // cloudy
  if (condition.includes("partly cloudy")) return `${iconPart}-cloudy`;
  if (condition.includes("mostly cloudy")) return "wi-cloudy";
  if (condition.includes("cloudy")) return "wi-cloud";

  // rain, mix snow/rain
  if (condition.includes("wintry mix")) return "wi-sleet";
  if (
    condition.includes("light rain") &&
    (condition.includes("snow") || condition.includes("light snow"))
  )
    return "wi-rain-mix";
  if (
    condition.includes("rain") &&
    (condition.includes("snow") || condition.includes("light snow"))
  )
    return "wi-rain-mix";
  // rain
  if (condition.includes("light rain")) return "wi-sprinkle";
  if (condition.includes("rain showers")) return "wi-showers";
  if (condition.includes("scattered showers")) return "wi-showers";
  if (condition.includes("rain")) return "wi-rain";
  // snow
  if (condition.includes("light snow") || condition.includes("snow showers"))
    return "wi-snow";
  if (condition.includes("snow")) return "wi-snowflake-cold";
};
