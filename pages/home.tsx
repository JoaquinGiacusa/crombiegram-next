import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import Box from "@mui/material/Box";
import NewPost from "../components/NewPost";
import useFetch from "../hooks/useFetch";
import MainLayout from "@/components/layouts/mainLayout";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPageContext,
} from "next";
import { usePost } from "@/hooks/usePost";

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
  const [listPost, setListPost] = useState<ListPostProps>([]);
  const [reFetchPost, setReFetchPost] = useState(0);

  const { data, error, isLoading } = usePost();

  useEffect(() => {
    if (data) {
      setListPost(data);
    }
  }, [data, reFetchPost]);

  // useEffect(() => {
  //   handleFetch({
  //     path: "post",
  //     method: "GET",
  //   }).then((jsonResponse) => {
  //     setListPost(jsonResponse);
  //     // setReFetchPost((prev) => prev + 1);
  //   });
  // }, [reFetchPost]);

  return (
    <MainLayout>
      <Box>
        {/* <NewPost /> */}
        <NewPost
        // onAdd={() => {
        //   setReFetchPost((prev) => prev + 1);
        // }}
        />
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
          {listPost.length > 0
            ? listPost.map((p) => {
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

// export async function getStaticProps(context: NextPageContext) {
//   // useEffect(() => {
//   //   handleFetch({
//   //     path: "post",
//   //     method: "GET",
//   //   }).then((jsonResponse) => {
//   //     setListPost(jsonResponse);
//   //     // setReFetchPost((prev) => prev + 1);
//   //   });
//   // }, [reFetchPost]);

//   const res = await fetch(`http://localhost:3000/api/post`);
//   const data = await res.json();

//   return {
//     props: { data },
//     revalidate: 5,
//   };
// }
