import { fetcher } from "utils/fetcher";
import useSWR from "swr";

export const useProducts = () => {
  const { data, error, isLoading, mutate } = useSWR("/post", fetcher);

  return { data, error, isLoading, mutate };
};
