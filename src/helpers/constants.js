// export const API_WEATHER = "https://sd-weather.up.railway.app";
// export const API_WEATHER = "https://sd-weather-test.up.railway.app";
// export const API_WEATHER = "http://localhost:3002";

export const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  }).then((res) => res.json());

export const radarSize = {
  height: "565px",
  width: "760px",
  maxWidth: "760px",
  maxHeight: "565px",
  // minWidth: "300px",
  // minHeight: "250px",
};

export const infraredSize = {
  maxWidth: "845px",
  maxHeight: "615px",
  minWidth: "300px",
  minHeight: "250px",
};
