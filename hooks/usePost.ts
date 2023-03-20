import { fetcher } from "utils/fetcher";
import useSWRInfinite from "swr/infinite";

// export type PostProps = {
//   contentText: string;
//   createdAt: Date;
//   id: string;
//   imageName: string;
//   updatedAt: string;
//   userId: string;
//   user: {
//     firstName: string;
//     lastName: string;
//     profileImage: string;
//     position?: string;
//   };

//   like: {
//     id: string;
//     postId: string;
//     user: { firstName: string; lastName: string; profileImage: string };
//     userId: string;
//   }[];
//   comment: {
//     id: string;
//     comment: string;
//     userId: string;
//     postId: string;
//     createdAt: Date;
//     user: {
//       firstName: string;
//       lastName: string;
//       profileImage?: string;
//       position?: string;
//     };
//   }[];
// }[];

export type PostProps = {
  id: string;
  contentText: string;
  imageName?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  user: {
    firstName: string;
    lastName: string;
    profileImage?: string;
    position?: string;
  };
  like: Array<{
    id: string;
    userId: string;
    postId: string;
    createdAt: Date;
    updatedAt: Date;
    user: {
      firstName: string;
      lastName: string;
    };
  }>;
  comment: Array<{
    id: string;
    comment: string;
    userId: string;
    postId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: any;
    user: {
      firstName: string;
      lastName: string;
      profileImage: string;
      position: string;
    };
  }>;
};

const getKey = (pageIndex: number) => {
  return `/post?size=5&page=${pageIndex}`;
};

const usePost = () => {
  const { data, error, isLoading, isValidating, mutate, size, setSize } =
    useSWRInfinite<PostProps[]>(getKey, fetcher, {
      revalidateOnFocus: false,
      revalidateAll: false,
    });

  const moreToCharge = size * 5 === data?.flat().length;

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
    size,
    setSize,
    moreToCharge,
  };
};

export { usePost };
