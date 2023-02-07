import { fetcher } from "utils/fetcher";
import useSWR from "swr";

type PostProps = {
  contentText: string;
  createdAt: Date;
  id: string;
  imageName: string;
  updatedAt: string;
  userId: string;
  user: {
    firstName: string;
    lastName: string;
    profileImage: string;
    position?: string;
  };

  like: {
    id: string;
    postId: string;
    user: { firstName: string; lastName: string; profileImage: string };
    userId: string;
  }[];
  comment: {
    id: string;
    comment: string;
    userId: string;
    postId: string;
    createdAt: Date;
    user: {
      firstName: string;
      lastName: string;
      profileImage?: string;
      position?: string;
    };
  }[];
}[];

export const usePost = () => {
  const { data, error, isLoading, mutate } = useSWR<PostProps>(
    "/post",
    fetcher
  );
  return { data, error, isLoading, mutate };
};
