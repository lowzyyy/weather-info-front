import { fetcher, getApiUrl } from "@/helpers/constants";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";

const Logs = ({ url }) => {
  const { data, error } = useSWR(`${url}/getAvailableLogs`, fetcher);
  console.log(data, error, url);

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
          {data &&
            data.map((log) => {
              return <Link href={`logs/${log}`}>{log}</Link>;
            })}
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
