import { fetcher } from "utils/fetcher";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

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

export const usePost = () => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    //if (previousPageData && !previousPageData.length) return null;
    pageIndex = pageIndex + 1;
    return `/post?page=${pageIndex}&size=5`;
  };

  const { data, error, isLoading, isValidating, mutate, size, setSize } =
    // useSWRInfinite<PostProps>(getKey, fetcher);
    useSWRInfinite(getKey, fetcher);
  //@ts-ignore
  //console.log("usePost", data);
  return { data, error, isLoading, mutate, size, setSize };
};
