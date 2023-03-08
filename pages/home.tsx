import React, { useCallback, useEffect, useRef, useState } from "react";
import Post from "../components/Post";
import Box from "@mui/material/Box";
import NewPost from "../components/NewPost";
import MainLayout from "@/components/layouts/mainLayout";
import { GetServerSideProps } from "next";
import { PostProps, usePost } from "@/hooks/usePost";
import revalidateToken from "@/utils/revalidateAuth";
import { getCookie } from "cookies-next";
import LoadingPost from "@/components/LoadingPost";
import { fetcher } from "@/utils/fetcher";
import { SWRConfiguration } from "swr";
import Button from "@mui/material/Button";
import useOnScreen from "@/hooks/useOneScreen";

function Home({ fallback }: { fallback: SWRConfiguration }) {
  const { post, offset, setOffset, isLoading, totalPost } = usePost();
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  useEffect(() => {
    if (isVisible && !isLoading) {
      setOffset(offset + 1);
    }
  }, [isVisible]);

  return (
    <MainLayout fallback={fallback}>
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
          {isLoading && <LoadingPost />}

          {post &&
            post.map((p: any) => {
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
                  like={p.like}
                  userId={p.userId}
                ></Post>
              );
            })}
          {totalPost !== post.length && <div ref={ref}></div>}
          <Button onClick={() => setOffset(offset + 1)}>Show more</Button>
          {!post && !isLoading && "No posts."}
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

  await revalidateToken(authToken, authExpires, context);

  const me = await fetcher("/user/me", {
    method: "GET",
    headers: {
      Cookie: `authToken=${authToken};`,
    },
    credentials: "include",
  });

  return {
    props: {
      fallback: {
        "/user/me": me,
      },
    },
  };
};
