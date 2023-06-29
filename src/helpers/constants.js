// export const API_WEATHER = "https://sd-weather.up.railway.app";
// export const API_WEATHER = "https://sd-weather-test.up.railway.app";
// export const API_WEATHER = "http://localhost:3002";

export const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  }).then((res) => res.json());
