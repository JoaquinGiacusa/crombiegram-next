import React, { useState } from "react";
import Box from "@mui/material/Box";
import MainLayout from "@/components/layouts/mainLayout";
import UserCard from "@/components/UserCard";
import { GetServerSideProps } from "next";
import { getCookie } from "cookies-next";
import revalitaToken from "@/utils/revalidateAuth";
import useUsers from "@/hooks/useUsers";
import NewPost from "@/components/NewPost";

export type ListUserProps = {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  position: string;
}[];

function Network() {
  const { data, error, isLoading } = useUsers();

  return (
    <MainLayout>
      <Box>
        <NewPost />
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
          {data && data?.length > 0
            ? data.map((contact) => {
                return (
                  <UserCard
                    key={contact.id}
                    id={contact.id}
                    firstName={contact.firstName}
                    lastName={contact.lastName}
                    position={contact.position}
                    profileImage={contact.profileImage}
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
