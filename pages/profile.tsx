import React, { useEffect, useState } from "react";
import Box from "@mui/system/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Edit from "@mui/icons-material/Edit";
import MainLayout from "@/components/layouts/mainLayout";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import useUser from "@/hooks/useUser";
import EditProfile from "@/components/EditProfile";
import NewPost from "@/components/NewPost";
import { GetServerSideProps } from "next";
import { getCookie } from "cookies-next";
import revalitaToken from "@/utils/revalidateAuth";
import { usePost } from "@/hooks/usePost";
import { ListPostProps } from "./home";
import Post from "@/components/Post";
import { userAgent } from "next/server";
import { Stack } from "@mui/system";
const Profile = () => {
  const { data, error, isLoading, mutate } = useUser();
  console.log(data?.userPosts);

  return (
    <MainLayout>
      <NewPost
      // onAdd={() => {
      //   setReFetchPost((prev) => prev + 1);
      // }}
      />
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Card
          sx={{
            borderRadius: 5,
            m: 1,
            mt: 5,
            maxWidth: 700,
            width: "100%",
          }}
          elevation={10}
        >
          <Image src="/images/colors.png" height={160} width={700} alt="" />
          <EditProfile />
          <Avatar
            src={
              data?.user.profileImage
                ? `https://crombiegram-s3.s3.sa-east-1.amazonaws.com/${data?.user.profileImage}`
                : ""
            }
            sx={{
              position: "relative",
              height: { sm: 150, xs: 100 },
              width: { sm: 150, xs: 100 },
              borderRadius: 50,
              border: 5,
              borderColor: "#8e44ad",
              ml: 5,
              mt: -12,
            }}
            alt="ProfileAvatar"
          />

          <Box sx={{ m: 5 }}>
            <Typography variant="h5">
              {data?.user.firstName} {data?.user.lastName}
            </Typography>
            <Typography>{data?.user.position}</Typography>
          </Box>
        </Card>
      </Box>
      <Stack
        direction="column"
        spacing={3}
        sx={{
          mt: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {data && data?.userPosts?.length > 0
          ? data?.userPosts?.map((p) => {
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
                />
              );
            })
          : "No post to show"}
      </Stack>
    </MainLayout>
  );
};

export default Profile;

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
