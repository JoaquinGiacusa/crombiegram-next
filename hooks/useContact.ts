import { fetcher } from "@/utils/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";

export type ContactDataProps = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthday: string;
  password: string;
  profileImage: string;
  position: string;
  createdAt: Date;
  updatedAt: Date;
  post: [
    {
      id: string;
      contentText: string;
      imageName: string;
      userId: string;
      createdAt: Date;
      updatedAt: Date;
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
    }
  ];
};
[];

const useContact = () => {
  const route = useRouter();
  const id = route.query.id;
  console.log(id);

  const { data, error, isLoading, mutate } = useSWR<ContactDataProps>(
    `/user/contact/${id}`,
    fetcher
  );

  return { data, error, isLoading };
};
export default useContact;
