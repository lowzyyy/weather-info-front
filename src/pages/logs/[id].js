import useSWR from "swr";
import { fetcher, getApiUrl } from "@/helpers/constants";
import { useRouter } from "next/router";
import { Roboto_Mono } from "next/font/google";

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
        <div className="absolute top-[64px] bottom-3 flex  w-full flex-col overflow-hidden">
          <h3 className="my-2 md:my-4 md:text-2xl">{logId}</h3>
          <div
            className={`flex h-full flex-col overflow-auto border-t-[1px] border-blue-300 ${robotoMono.className}`}
          >
            {data &&
              data.toReversed().map((log, i) => {
                const time = log.timestamp.split("T")[1];
                const label = log.label.padEnd(12, " ");
                const labelLevel = (
                  <div className="hidden sm:inline">
                    {" "}
                    {log.level} {label}:
                  </div>
                );

                return (
                  <div key={i}>
                    <pre className="hidden text-base md:block">
                      {`${time}`} |{labelLevel} {`${log.message}`}
                    </pre>
                    <div className="text-xs md:hidden">{`${time} | ${log.message}`}</div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default LogPreview;

export async function getServerSideProps() {
  return await getApiUrl();
}
