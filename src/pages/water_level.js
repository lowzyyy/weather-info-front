import WaterGraph from "@/components/WaterGraph/WaterGraph";
import Head from "next/head";

function WaterLevel() {
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
