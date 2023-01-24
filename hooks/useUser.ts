import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

const useUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/user/me", fetcher);

  return { data, error, isLoading, mutate };
};
export default useUser;
