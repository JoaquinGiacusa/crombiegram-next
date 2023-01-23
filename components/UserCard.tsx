import useUser from "@/hooks/useUser";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import NewPost from "./NewPost";
import MainLayout from "@/components/layouts/mainLayout";

export type UserCardPropsType = {
  id: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  position: string;
};

const UserCard: React.FC<UserCardPropsType> = ({
  id,
  firstName,
  lastName,
  profileImage,
  position,
}) => {
  const { data } = useUser();
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
          <CardMedia
            image={
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
            title="profile"
          />

          <Box sx={{ m: 5 }}>
            <Typography variant="h5">
              {data?.user.firstName} {data?.user.lastName}
            </Typography>
            <Typography>{data?.user.position}</Typography>
          </Box>
        </Card>
      </Box>
    </MainLayout>
  );
};

export default UserCard;
