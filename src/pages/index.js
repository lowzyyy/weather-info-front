import Head from "next/head";
import { Inter } from "@next/font/google";

import TodayCard from "../components/TodayCard/TodayCard";
import ForecastCard from "@/components/ForecastCard/ForecastCard";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Smederevo weather - today</title>
        <meta name="description" content="Meteoroloske informacije o gradu Smederevu" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TodayCard></TodayCard>
      <ForecastCard></ForecastCard>
    </>
  );
}
