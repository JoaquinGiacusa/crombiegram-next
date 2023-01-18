import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import Box from "@mui/material/Box";
import NewPost from "../components/NewPost";
import useFetch from "../hooks/useFetch";
import MainLayout from "@/components/layouts/mainLayout";

export type ListPostProps = {
  id: string;
  firstName: string;
  lastName: string;
  contentText: string;
  imageName?: string;
  profileImage: string;
  user: { firstName: ""; lastName: ""; profileImage: "" };
}[];

function Home() {
  const [listPost, setListPost] = useState<ListPostProps>([]);
  const [reFetchPost, setReFetchPost] = useState(0);
  const handleFetch = useFetch();

  useEffect(() => {
    handleFetch({
      path: "post",
      method: "GET",
    }).then((jsonResponse) => {
      setListPost(jsonResponse);
      // setReFetchPost((prev) => prev + 1);
    });
  }, [reFetchPost]);

  return (
    <MainLayout>
      <Box>
        <NewPost
          onAdd={() => {
            setReFetchPost((prev) => prev + 1);
          }}
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
                  ></Post>
                );
              })
            : "no hay post disponibles"}
        </Box>
      </Box>
    </MainLayout>
  );
}

export default Home;
