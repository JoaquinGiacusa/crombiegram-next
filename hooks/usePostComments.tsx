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
}[];

export const usePostComments = (postId: string) => {
  const { data, error, isLoading, mutate, size, setSize } =
    useSWRInfinite<CommentsProps>(
      (pageIndex) => `/comment/post/${postId}?page=${pageIndex}&size=6`,
      fetcher
    );
  const moreToCharge = size * 6 === data?.flat().length;

  return { data, error, isLoading, mutate, size, setSize, moreToCharge };
};
