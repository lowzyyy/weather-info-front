// components
import InfraredCard from "@/components/InfraredCard/InfraredCard";
import RadarCard from "@/components/RadarCard/RadarCard";
import { UrlContext } from "@/components/UrlContext/UrlContext";
import { getApiUrl } from "@/helpers/constants";
import Head from "next/head";

const Radar = ({ url }) => {
  return (
    <>
      <Head>
        <title>Smederevo weather - radar</title>
        <meta
          name="description"
          content="Meteoroloske informacije o gradu Smederevu"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {url ? (
        <UrlContext.Provider value={url}>
          <RadarCard></RadarCard>
          <InfraredCard></InfraredCard>
        </UrlContext.Provider>
      ) : (
        <p>Could not reach the server!</p>
      )}
    </>
  );
};

export default Radar;

export async function getServerSideProps() {
  return await getApiUrl();
}
