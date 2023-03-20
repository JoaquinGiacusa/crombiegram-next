import React, { useCallback, useEffect, useRef, useState } from "react";
import Post from "../components/Post";
import Box from "@mui/material/Box";
import NewPost from "../components/NewPost";
import MainLayout from "@/components/layouts/mainLayout";
import { GetServerSideProps } from "next";
import { usePost } from "@/hooks/usePost";
import revalidateToken from "@/utils/revalidateAuth";
import { getCookie } from "cookies-next";
import LoadingPost from "@/components/LoadingPost";
import { fetcher } from "@/utils/fetcher";
import { SWRConfiguration } from "swr";
import Button from "@mui/material/Button";
import useOnScreen from "@/hooks/useOneScreen";
import { Typography } from "@mui/material";

function Home({ fallback }: { fallback: SWRConfiguration }) {
  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
    size,
    setSize,
    moreToCharge,
  } = usePost();

  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  useEffect(() => {
    if (!isLoading && !isValidating) {
      setSize(size + 1);
    }
  }, [isVisible]);

  return (
    <MainLayout fallback={fallback}>
      <Box>
        <NewPost refresh={() => mutate()} />
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
          {data && data![0].length == 0 && (
            <Typography>No pots to show.</Typography>
          )}
          {data &&
            data!.map((posts, index) => {
              return posts.map((p) => {
                return (
                  <Post key={p.id} dataPost={p} refresh={() => mutate()} />
                );
              });
            })}

          {moreToCharge && <div style={{ paddingBottom: "30px" }} ref={ref} />}
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
