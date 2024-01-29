import { headerForSkip } from "@/helpers/constants";
import useSWR from "swr";

const fetcher = (url) =>
  fetch(url, {
    headers: {
      [headerForSkip]: "true",
    },
  })
    .then((res) => res.blob())
    .then((blob) => URL.createObjectURL(blob))
    .catch((error) => "error");

const arrayFetcher = (urls) => {
  return Promise.all(urls.map((url) => fetcher(url)));
};

const useGetImagesLink = (links) => {
  const urls = links
    .map((el) => el.link)
    .filter((el) => {
      return !(el.includes("meteoplaza") || el.includes("hidmet"));
    });
  const result = useSWR(urls, arrayFetcher);
  return result;
};

export default useGetImagesLink;
