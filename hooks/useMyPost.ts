import { fetcher } from "@/utils/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";

export type useMyPostType = {
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

const useMyPost = () => {
  const {
    data: allMyPost,
    error: errorMyPost,
    isLoading: isLoadingMyPost,
    mutate,
  } = useSWR<useMyPostType>(`/post/me`, fetcher);

  return { allMyPost, errorMyPost, isLoadingMyPost };
};
export default useMyPost;
