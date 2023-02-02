import React from "react";
import Box from "@mui/system/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import MainLayout from "@/components/layouts/mainLayout";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import EditProfile from "@/components/EditProfile";
import NewPost from "@/components/NewPost";
import { GetServerSideProps } from "next";
import { getCookie } from "cookies-next";
import revalitaToken from "@/utils/revalidateAuth";
import Post from "@/components/Post";
import { Stack } from "@mui/system";
import useContact from "@/hooks/useContact";

const Contact = () => {
  const { data, error, isLoading } = useContact();

  return (
    <MainLayout>
      <NewPost />
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
              data?.profileImage
                ? `https://crombiegram-s3.s3.sa-east-1.amazonaws.com/${data?.profileImage}`
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
              {data?.firstName} {data?.lastName}
            </Typography>
            <Typography>{data?.position}</Typography>
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
        {data && data?.post?.length > 0
          ? data?.post?.map((p) => {
              return (
                <Post
                  key={p.id}
                  id={p.id}
                  contentText={p.contentText}
                  imageName={p.imageName}
                  firstName={data.firstName}
                  lastName={data.lastName}
                  profileImage={data.profileImage}
                  createdAt={p.createdAt}
                  position={data.position}
                  comment={p.comment}
                />
              );
            })
          : "No post to show"}
      </Stack>
    </MainLayout>
  );
};

export default Contact;

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
