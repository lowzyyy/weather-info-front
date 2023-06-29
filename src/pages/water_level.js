import WaterGraph from "@/components/WaterGraph/WaterGraph";
import Head from "next/head";

function WaterLevel({ url }) {
  return (
    <div>
      <Head>
        <title>Smederevo weather - water</title>
        <meta name="description" content="Meteoroloske informacije o gradu Smederevu" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WaterGraph />
    </div>
  );
}

export default WaterLevel;

export async function getServerSideProps() {
  const ngrokRes = await fetch("https://api.ngrok.com/tunnels", {
    headers: {
      Authorization: `Bearer ${process.env.ngrok_api_key}`,
      "ngrok-version": "2",
    },
  });
  if (!ngrokRes.ok) console.log(`ERROR NGROK API: ${ngrokRes.status}`);

  const { tunnels } = await ngrokRes.json();

  const url = tunnels.find(
    (t) => t.public_url.startsWith("https") && t.metadata === "sd-weather"
  ).public_url;

  return {
    props: { url }, // will be passed to the page component as props
  };
}
