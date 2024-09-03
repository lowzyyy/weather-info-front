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
  if (process.env.USE_NGROK === "true") {
    const ngrokRes = await fetch("https://api.ngrok.com/tunnels", {
      headers: {
        Authorization: `Bearer ${process.env.ngrok_api_key}`,
        "Ngrok-Version": "2",
      },
    });
    if (!ngrokRes.ok) console.log(`ERROR NGROK API: ${ngrokRes.status}`);

    const { tunnels } = await ngrokRes.json();

    const url = tunnels.filter((t) => t.metadata === "sd-weather")[0]
      .public_url;
    console.log(url);
    return {
      props: { url },
    };
  } else return { props: { url: process.env.BACKEND_API } };
};
