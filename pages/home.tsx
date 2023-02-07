import React from "react";
import Post from "../components/Post";
import Box from "@mui/material/Box";
import NewPost from "../components/NewPost";
import MainLayout from "@/components/layouts/mainLayout";
import { GetServerSideProps } from "next";
import { usePost } from "@/hooks/usePost";
import revalitaToken from "@/utils/revalidateAuth";
import { getCookie } from "cookies-next";
import LoadingPost from "@/components/LoadingPost";

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
          {isLoading && <LoadingPost loading />}
          {data && data?.length > 0
            ? data?.map((p) => {
                return (
                  <Post
                    key={p.id}
                    id={p.id}
                    userId={p.userId}
                    contentText={p.contentText}
                    imageName={p.imageName}
                    firstName={p.user.firstName}
                    lastName={p.user.lastName}
                    profileImage={p.user.profileImage}
                    createdAt={p.createdAt}
                    position={p.user.position}
                    comment={p.comment}
                    like={p.like}
                  ></Post>
                );
              })
            : !isLoading && "No post to show."}
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
