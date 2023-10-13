const minutes30 = 1_800_000;
const fetchInterval = 30;
const fetchInMin = 5;
const timePartToString = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};
export const createLinkNames = (API_WEATHER) => {
  const history = 16; //last 6h
  const timeNow = new Date();
  const minuteReminder = timeNow.getMinutes() % 5;
  timeNow.setMinutes(
    minuteReminder < 3
      ? timeNow.getMinutes() - minuteReminder
      : timeNow.getMinutes() + (5 - minuteReminder)
  );
  const endTs = timeNow.getTime() - 25 * 60 * 1000;
  const startTs = endTs - (history - 1) * minutes30;
  const links = [];
  for (let i = startTs; i <= endTs; i += minutes30) {
    const time = new Date(i);
    const minute = timePartToString(time.getMinutes());
    const hour = timePartToString(time.getUTCHours());
    const month = timePartToString(time.getUTCMonth() + 1);
    const day = timePartToString(time.getUTCDate());
    const year = `${time.getUTCFullYear()}`;
    const imageName = year + month + day + hour + minute;
    links.push({
      time: `${timePartToString(time.getHours())}:${minute}`,
      link: `https://imn-api.meteoplaza.com/v4/nowcast/tiles/satellite-europe/${imageName}/5/8/14/14/20?outputtype=jpeg`,
    });
  }
  return links;
};

// createLinkNames();
