import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import Box from "@mui/material/Box";
import NewPost from "../components/NewPost";

import MainLayout from "@/components/layouts/mainLayout";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPageContext,
} from "next";
import { usePost } from "@/hooks/usePost";
import { getCookie, setCookie } from "cookies-next";
import moment from "moment";
import revalitaToken from "@/utils/revalidateAuth";

export type ListPostProps = {
  id: string;
  firstName: string;
  lastName: string;
  contentText: string;
  imageName?: string;
  profileImage: string;
  createdAt: Date;
  user: { firstName: ""; lastName: ""; profileImage: "" };
}[];

function Home() {
  const { data, error, isLoading } = usePost();

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
            ? data?.map((p) => {
                return (
                  <Post
                    key={p.id}
                    id={p.id}
                    contentText={p.contentText}
                    imageName={p.imageName}
                    firstName={p.user.firstName}
                    lastName={p.user.lastName}
                    profileImage={p.user.profileImage}
                    createdAt={p.createdAt}
                    position={p.user.position}
                  ></Post>
                );
              })
            : "No post to show."}
        </Box>
      </Box>
    </MainLayout>
  );
}

export default Home;

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
