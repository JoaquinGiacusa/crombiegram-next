import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export type UsersDataProps = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  profileImage: string;
  position?: string;
  createdAt: Date;
  updatedAt: Date;
}[];

const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR<UsersDataProps>(
    "/user/network",
    fetcher
  );

  return { data, error, isLoading, mutate };
};
export default useUsers;
