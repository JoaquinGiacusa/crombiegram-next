import React from "react";
import Box from "@mui/system/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import MainLayout from "@/components/layouts/mainLayout";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import useUser from "@/hooks/useUser";
import EditProfile from "@/components/EditProfile";
import NewPost from "@/components/NewPost";
import { GetServerSideProps } from "next";
import { getCookie } from "cookies-next";
import revalidateToken from "@/utils/revalidateAuth";
import Post from "@/components/Post";
import { Stack } from "@mui/system";
import LoadingProfile from "@/components/LoadingProfile";
import { fetcher } from "@/utils/fetcher";
import useMyPost from "@/hooks/useMyPost";
import { SWRConfiguration } from "swr";
import { Button } from "@mui/material";

const Profile = ({ fallback }: { fallback: SWRConfiguration }) => {
  const { data, isLoading, error } = useUser();
  const { allMyPost, isLoadingMyPost, mutate, size, setSize, moreToCharge } =
    useMyPost();

  return (
    <MainLayout fallback={fallback}>
      <NewPost refresh={() => mutate()} />

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
              borderColor: "#26B8E9",
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
        {/* {isLoading && <LoadingProfile />} */}

        {allMyPost &&
          allMyPost.map((posts) => {
            return posts.map((dataPost) => {
              return (
                <Post
                  key={dataPost.id}
                  dataPost={dataPost}
                  refresh={() => mutate()}
                />
              );
            });
          })}

        {!allMyPost && !isLoadingMyPost && "No posts."}
        {moreToCharge && (
          <Button
            sx={{ margin: "0 auto", mb: 3 }}
            onClick={() => setSize(size + 1)}
          >
            Load more
          </Button>
        )}
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
