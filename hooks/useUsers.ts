import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

const useUsers = () => {
  const { data, error, isLoading } = useSWR("/user/network", fetcher);

  return { data, error, isLoading };
};
export default useUsers;
