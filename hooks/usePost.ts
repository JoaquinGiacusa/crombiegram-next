import { fetcher } from "utils/fetcher";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { useState } from "react";

type PostProps = {
  totalPost: number;
  totalPages: number;
  postList: {
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
};

// export const usePost = () => {
//   const [offset, setOffset] = useState(1);

//   const { data, error, isLoading, mutate } = useSWRInfinite(
//     () => `/post?page=${offset}&size=5`,
//     fetcher
//   );
//   const finalData = data?.flat();

//   return { finalData, error, isLoading, mutate, offset, setOffset };
// };

export const usePost = () => {
  const [offset, setOffset] = useState(1);

  const { data, error, isLoading, mutate } = useSWR(
    `/post?page=${offset}&size=5`,
    fetcher
  );

  return { data, error, isLoading, mutate, offset, setOffset };
};
