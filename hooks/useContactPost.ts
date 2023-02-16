import { fetcher } from "@/utils/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";

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

const useContactPost = () => {
  const route = useRouter();
  const id = route.query.id;

  const { data, error, isLoading } = useSWR<ContactDataProps>(
    `/post/contact/${id}`,
    fetcher
  );

  return { data, error, isLoading };
};
export default useContactPost;
