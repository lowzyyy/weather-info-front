import { fetcher, getApiUrl } from "@/helpers/constants";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";

const Logs = ({ url }) => {
  const { data } = useSWR(`${url}/getAvailableLogs`, fetcher);
  return (
    <>
      <Head>
        <title>Smederevo weather - logs</title>
        <meta
          name="description"
          content="Meteoroloske informacije o gradu Smederevu"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {url ? (
        <div className="w-full">
          <h2 className="mb-4 text-xl">Available logs</h2>
          <div className="flex flex-col gap-1">
            {data &&
              data.map((log) => {
                return <Link href={`logs/${log}`}>{log}</Link>;
              })}
          </div>
        </div>
      ) : (
        <p>Could not reach the server!</p>
      )}
    </>
  );
};

export default Logs;

export async function getServerSideProps() {
  return await getApiUrl();
}
