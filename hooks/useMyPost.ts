import { fetcher } from "@/utils/fetcher";
import { useRouter } from "next/router";
import useSWRInfinite from "swr/infinite";
import { PostProps } from "./usePost";

export const useMyPost = () => {
  const {
    data: allMyPost,
    error: errorMyPost,
    isLoading: isLoadingMyPost,
    mutate,
    size,
    setSize,
  } = useSWRInfinite<PostProps[]>(
    (pageIndex) => `/post/me?page=${pageIndex}&size=4`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateAll: false,
    }
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
