import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

export type CommentsProps = {
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
};

export const usePostComments = (postId: string) => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    pageIndex = pageIndex + 1;
    return `/comment/post/${postId}?page=${pageIndex}&size=5`;
  };
  const { data, error, isLoading, mutate, size, setSize } =
    useSWRInfinite<CommentsProps>(getKey, fetcher);
  return { data, error, isLoading, mutate, size, setSize };
};
