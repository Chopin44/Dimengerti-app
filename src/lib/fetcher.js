import useSWR from "swr";

const baseURL = "http://localhost:5173/";
// onst baseURL = "https://belajarsibi.vercel.app/";

const response = (...args) => fetch(...args).then((res) => res.json());

export default function Fetcher(endpoint) {
  const { data, error } = useSWR(`${baseURL}${endpoint}`, response);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
