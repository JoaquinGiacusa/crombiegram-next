import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import MainLayout from "@/components/layouts/mainLayout";
import useUsers from "@/hooks/useUsers";
import UserCard from "@/components/UserCard";
import { GetServerSideProps } from "next";
import { getCookie } from "cookies-next";
import revalitaToken from "@/utils/revalidateAuth";

export type ListUserProps = {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  position: string;
}[];

function Network() {
  const [listUser, setListUser] = useState<ListUserProps>([]);

  const { data, error, isLoading } = useUsers();

  useEffect(() => {
    if (data) {
      setListUser(data);
    }
  }, [data]);

  return (
    <MainLayout>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            mt: 2,
          }}
        >
          {listUser.length > 0
            ? listUser.map((user) => {
                return (
                  <UserCard
                    key={user.id}
                    id={user.id}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    position={user.position}
                  />
                );
              })
            : "No contacts to show."}
        </Box>
      </Box>
    </MainLayout>
  );
}

export default Network;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authToken = getCookie("authToken", context) as string;
  const authExpires = getCookie("authExpires", context) as string;

  if (!authToken || !authExpires) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  await revalitaToken(authToken, authExpires, context);

  return {
    props: {},
  };
};
