import React, { useEffect, useState } from "react";
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

function Home({ fallback }: { fallback: SWRConfiguration }) {
  const { data, error, isLoading, offset, setOffset } = usePost();
  const [postsToShow, setPostsToShow] = useState([]);
  const [prevData, setPrevData] = useState([]);

  // useEffect(() => {
  //   setPrevData(data);
  //   if (prevData != [undefined]) {
  //     setPostsToShow([...prevData, data]);
  //   }
  // }, [data]);
  // console.log("xd", postsToShow);
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

          {/* <InfiniteScroll
            dataLength={data?.flat().length ?? 0}
            next={() => setOffset(offset + 1)}
            hasMore={!isReachedEnd}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>You have seen it all</b>
              </p>
            }
          > */}
          {data &&
            data?.map((p) => {
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
          {/* </InfiniteScroll> */}
          {!data && !isLoading && "No posts."}
          <Button onClick={() => setOffset(offset + 1)}>Show more</Button>
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
