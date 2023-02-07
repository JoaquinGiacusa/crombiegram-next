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
};

const useContact = () => {
  const route = useRouter();
  const id = route.query.id;

  const { data, error, isLoading, mutate } = useSWR<ContactDataProps>(
    `/user/contact/${id}`,
    fetcher
  );

  return { data, error, isLoading };
};
export default useContact;
