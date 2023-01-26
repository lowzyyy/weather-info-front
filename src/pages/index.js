import Head from "next/head";
import { Inter } from "@next/font/google";

import TodayCard from "../components/Today/TodayCard";
import ForecastCard from "@/components/Forecast/ForecastCard";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // TODO: FORECAST CARD (API IS DONE, I GUESS !?)

  return (
    <>
      <Head>
        <title>Smederevo vreme</title>
        <meta
          name="description"
          content="Meteoroloske informacije o gradu Smederevu"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TodayCard></TodayCard>
      <ForecastCard></ForecastCard>
    </>
  );
}
