import { API_WEATHER } from "./constants";
const minutes15 = 900_000;
const timePartToString = (value) => {
  return value < 10 ? `0${value}` : value;
};
export const createLinkNames = () => {
  const history = 24; //last 6h
  const timeNow = new Date();
  const minuteReminder = timeNow.getMinutes() % 15;
  if (minuteReminder > 9) timeNow.setMinutes(timeNow.getMinutes() - minuteReminder);
  else timeNow.setMinutes(timeNow.getMinutes() - minuteReminder - 15);
  const endTs = timeNow.getTime();
  const startTs = endTs - (history - 1) * minutes15;
  const links = [...Array(history)].map((t, i) => {
    const time = new Date(startTs + i * minutes15);
    const minute = timePartToString(time.getMinutes());
    if (i >= 16) {
      const hour = timePartToString(time.getUTCHours());
      const month = timePartToString(time.getUTCMonth() + 1);
      const day = timePartToString(time.getUTCDate());
      const year = time.getUTCFullYear();
      const imageName = year + month + day + hour + minute;
      return {
        time: `${timePartToString(time.getHours())}:${minute}`,
        link: `https://www.hidmet.gov.rs/data/radarska_slika/kompozit/ko${imageName}0000dBZ.cappi.png`,
      };
    } else {
      return {
        time: `${timePartToString(time.getHours())}:${minute}`,
        link: `${API_WEATHER}/radar/${i + 1}`,
      };
    }
  });
  return links;
};
