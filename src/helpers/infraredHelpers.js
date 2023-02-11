import { API_WEATHER } from "./constants";
const minutes30 = 1_800_000;
const fetchInterval = 30;
const fetchInMin = 5;
const timePartToString = (value) => {
  return value < 10 ? `0${value}` : value;
};
export const createLinkNames = () => {
  const history = 12; //last 6h
  const timeNow = new Date();
  const minuteReminder = timeNow.getMinutes() % fetchInterval;
  if (minuteReminder >= fetchInMin)
    timeNow.setMinutes(timeNow.getMinutes() - minuteReminder);
  else timeNow.setMinutes(timeNow.getMinutes() - minuteReminder - fetchInterval);
  const endTs = timeNow.getTime();
  const startTs = endTs - (history - 1) * minutes30;
  const links = [...Array(history)].map((t, i) => {
    const time = new Date(startTs + i * minutes30);
    const minute = timePartToString(time.getMinutes());
    if (i >= 10) {
      const hour = timePartToString(time.getUTCHours());
      const month = timePartToString(time.getUTCMonth() + 1);
      const day = timePartToString(time.getUTCDate());
      const year = time.getUTCFullYear();
      const imageName = year + month + day + hour + minute;
      return {
        time: `${timePartToString(time.getHours())}:${minute}`,
        link: `https://en.sat24.com/image?type=infraPolair&region=ba&timestamp=${imageName}`,
      };
    } else {
      return {
        time: `${timePartToString(time.getHours())}:${minute}`,
        link: `${API_WEATHER}/infrared/${i + 1}`,
      };
    }
  });
  return links;
};
