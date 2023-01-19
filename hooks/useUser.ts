import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export const useUser = () => {
  const { data, error, isLoading } = useSWR("/user/me", fetcher);

  return { data, error, isLoading };
};
