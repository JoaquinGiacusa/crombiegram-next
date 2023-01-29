import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export type UserDataProps = {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    profileImage: string;
    position: string;
    createdAt: Date;
    updatedAt: Date;
  };
  userPosts: {
    id: string;
    contentText: string;
    imageName: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    user: {
      firstName: string;
      lastName: string;
      profileImage: string;
      position?: string;
    };
  }[];
};

const useUser = () => {
  const {
    data: UserDataProps,
    error,
    isLoading,
    mutate,
  } = useSWR<UserDataProps>("/user/me", fetcher);

  return { data: UserDataProps, error, isLoading, mutate };
};
export default useUser;
