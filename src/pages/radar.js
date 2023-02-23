// components
import InfraredCard from "@/components/InfraredCard/InfraredCard";
import RadarCard from "@/components/RadarCard/RadarCard";
import Head from "next/head";

const Radar = () => {
  return (
    <>
      <Head>
        <title>Smederevo weather - radar</title>
        <meta name="description" content="Meteoroloske informacije o gradu Smederevu" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RadarCard></RadarCard>
      <InfraredCard></InfraredCard>
    </>
  );
};

export default Radar;
