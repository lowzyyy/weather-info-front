// export const API_WEATHER = "https://sd-weather-test.up.railway.app";
// export const TUNNEL_MANAGER_API = "https://tunnel-manager.up.railway.app";

const headersArr = ["ngrok-skip-browser-warning", "Bypass-Tunnel-Reminder"];
export const headerForSkip = headersArr[0];

export const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      [headerForSkip]: "true",
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

export const getApiUrl = async () => {
  const ngrokRes = await fetch("https://api.ngrok.com/tunnels", {
    headers: {
      Authorization: `Bearer ${process.env.ngrok_api_key}`,
      "Ngrok-Version": "2",
    },
  });
  if (!ngrokRes.ok) console.log(`ERROR NGROK API: ${ngrokRes.status}`);

  const { tunnels } = await ngrokRes.json();

  const url = tunnels.filter((t) => t.metadata === "sd-weather")[0].public_url;
  console.log(url);
  return {
    props: { url },
  };
};

// export const getApiUrl = async () => {
//   const apiRes = await fetch(`${TUNNEL_MANAGER_API}/getApi?term=sd-weather`, {
//     headers: {
//       Authorization: `Bearer ${process.env.TUNNEL_MANAGER_KEY}`,
//     },
//   });
//   if (!apiRes.ok) console.log(`ERROR TUNNEL API: ${apiRes.status}`);

//   const { data } = await apiRes.json();
//   return {
//     props: { url: (data && data.url) ?? null },
//   };
// };
