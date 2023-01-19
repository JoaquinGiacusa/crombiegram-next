import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

const useUser = () => {
  const { data, error, isLoading } = useSWR("/user/me", fetcher);

  return { data, error, isLoading };
};
export default useUser;
