import React, { useEffect } from "react";
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
import InfiniteScroll from "react-infinite-scroll-component";

function Home({ fallback }: { fallback: SWRConfiguration }) {
  const { data, error, isLoading, size, setSize } = usePost();
  //@ts-ignore
  const dataFlated = data?.flat();
  console.log("sad", dataFlated);

  const isReachedEnd = data && data[data.length - 1]?.lenght < 2;

  //useEffect(()=>)
  return (
    <MainLayout fallback={fallback}>
      <Box>
        <NewPost />

        <button onClick={() => setSize(size + 1)}>see more</button>
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

          <InfiniteScroll
            dataLength={data?.length ?? 0}
            next={() => setSize(size + 1)}
            hasMore={!isReachedEnd}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {data &&
              //data?.postList.map((p) => {
              data?.flat().map((p) => {
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
          </InfiniteScroll>
          {/* {!data?.postList && !isLoading && "No posts."} */}
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
