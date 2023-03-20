import { fetcher } from "@/utils/fetcher";
import { useRouter } from "next/router";
import useSWRInfinite from "swr/infinite";
import { PostProps } from "./usePost";

export type ContactDataProps = {
  id: string;
  contentText: string;
  imageName: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
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

// const useContactPost = () => {
//   const route = useRouter();
//   const id = route.query.id;

//   const { data, error, isLoading, mutate } = useSWR<ContactDataProps>(
//     `/post/contact/${id}`,
//     fetcher
//   );

//   return { data, error, isLoading, mutate };

// };

export const useContactPost = () => {
  const route = useRouter();
  const id = route.query.id;
  const {
    data: contactPost,
    error: errorMyPost,
    isLoading: isLoadingMyPost,
    mutate,
    size,
    setSize,
  } = useSWRInfinite<PostProps[]>(
    (pageIndex) => `/post/contact/${id}?page=${pageIndex}&size=4`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateAll: false,
    }
  );

  const moreToCharge = size * 4 === contactPost?.flat().length;

  return {
    contactPost,
    errorMyPost,
    isLoadingMyPost,
    mutate,
    size,
    setSize,
    moreToCharge,
  };
};

export default useContactPost;
