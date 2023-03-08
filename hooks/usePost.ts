import { fetcher } from "utils/fetcher";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { useEffect, useState } from "react";

export type PostProps = {
  totalCount: number;
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
    };
  }[];
};

// export const usePost = () => {
//   const [offset, setOffset] = useState(1);

//   const { data, error, isLoading, mutate } = useSWR<PostProps>(
//     `/post?page=${offset}&size=5`,
//     fetcher
//   );

//   return { data, error, isLoading, mutate, offset, setOffset };
// };

export const usePost = () => {
  const [post, setPost] = useState([]);
  const [offset, setOffset] = useState(1);
  const [totalPost, setTotalPost] = useState<number>();

  const { data, error, isLoading, mutate } = useSWR<PostProps>(
    `/post?page=${offset}&size=5`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  useEffect(() => {
    if (data != undefined && !isLoading) {
      setTotalPost(data!.totalCount);
      //@ts-ignore
      setPost([...post, ...data.postList]);
    } else {
    }
  }, [data]);

  return { post, offset, setOffset, isLoading, totalPost, mutate };
};
