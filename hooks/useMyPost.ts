import { fetcher } from "@/utils/fetcher";
import { useRouter } from "next/router";
import useSWRInfinite from "swr/infinite";

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

export const useMyPost = () => {
  const {
    data: allMyPost,
    error: errorMyPost,
    isLoading: isLoadingMyPost,
    mutate,
    size,
    setSize,
  } = useSWRInfinite<useMyPostType>(
    (pageIndex) => `/post/me?page=${pageIndex}&size=4`,
    fetcher
  );
  const moreToCharge = size * 4 === allMyPost?.flat().length;

  return {
    allMyPost,
    errorMyPost,
    isLoadingMyPost,
    mutate,
    size,
    setSize,
    moreToCharge,
  };
};

export default useMyPost;
