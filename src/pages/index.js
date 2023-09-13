import Head from "next/head";
import { Inter } from "@next/font/google";

import TodayCard from "../components/TodayCard/TodayCard";
import ForecastCard from "@/components/ForecastCard/ForecastCard";
import { UrlContext } from "@/components/UrlContext/UrlContext";
import { getApiUrl } from "@/helpers/constants";
const inter = Inter({ subsets: ["latin"] });

export default function Home({ url }) {
  return (
    <>
      <Head>
        <title>Smederevo weather - today</title>
        <meta
          name="description"
          content="Meteoroloske informacije o gradu Smederevu"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {url ? (
        <UrlContext.Provider value={url}>
          <TodayCard></TodayCard>
          <ForecastCard></ForecastCard>
        </UrlContext.Provider>
      ) : (
        <p>Could not reach the server!</p>
      )}
    </>
  );
}

export async function getServerSideProps() {
  return await getApiUrl();
}
