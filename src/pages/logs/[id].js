import { fetcher, getApiUrl } from "@/helpers/constants";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Roboto_Mono } from "@next/font/google";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });
const LogPreview = ({ url }) => {
  const router = useRouter();
  const logId = router.query.id;
  const { data } = useSWR(`${url}/getLogData/${logId}`, fetcher, {
    refreshInterval: 5000,
  });

  if (data === "Not found") {
    return <div className={`${robotoMono.className}`}>Not Found</div>;
  }
  return (
    <>
      {data && (
        <>
          <h3>{logId}</h3>
          <div className={`flex flex-col ${robotoMono.className}`}>
            {data &&
              data.map((log, i) => {
                const time = log.timestamp.split("T")[1];
                return (
                  <span
                    key={i}
                    className="text-xs"
                  >{`${time} | ${log.message}`}</span>
                );
              })}
          </div>
        </>
      )}
    </>
  );
};

export default LogPreview;

export async function getServerSideProps() {
  return await getApiUrl();
}
