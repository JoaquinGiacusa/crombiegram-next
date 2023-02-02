import React from "react";
import Post from "../components/Post";
import Box from "@mui/material/Box";
import NewPost from "../components/NewPost";
import MainLayout from "@/components/layouts/mainLayout";
import { GetServerSideProps } from "next";
import { usePost } from "@/hooks/usePost";
import revalitaToken from "@/utils/revalidateAuth";
import { getCookie } from "cookies-next";

// export type ListPostProps = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   contentText: string;
//   imageName?: string;
//   profileImage: string;
//   createdAt: Date;
//   userId: string;
//   user: { firstName: ""; lastName: ""; profileImage: "" };
// }[];

function Home() {
  const { data, error, isLoading } = usePost();
  // console.log(data);
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
                console.log(p);

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
                    comment={p.comment}
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
