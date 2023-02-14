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
import revalidateToken from "@/utils/revalidateAuth";
import Post from "@/components/Post";
import { Stack } from "@mui/system";
import useContact from "@/hooks/useContact";
import LoadingProfile from "@/components/LoadingProfile";
import useContactPost from "@/hooks/useContactPost";
import { fetcher } from "@/utils/fetcher";
import { SWRConfiguration } from "swr";

const Contact = ({ fallback }: { fallback: SWRConfiguration }) => {
  const { data, error, isLoading } = useContact();
  const { data: contactPost } = useContactPost();

  return (
    <MainLayout fallback={fallback}>
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
        {isLoading && <LoadingProfile />}

        {data &&
          contactPost &&
          contactPost?.map((p) => {
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
                like={p.like}
                userId={p.userId}
              />
            );
          })}

        {!isLoading && !data && "No posts."}
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
