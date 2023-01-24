import useUsers from "@/hooks/useUsers";
import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import NewPost from "./NewPost";
import MainLayout from "@/components/layouts/mainLayout";

export type UserCardPropsType = {
  id: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  position?: string;
};

const UserCard: React.FC<UserCardPropsType> = ({
  id,
  firstName,
  lastName,
  profileImage,
  position,
}) => {
  return (
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
        <Stack direction="row">
          <CardMedia
            image={
              profileImage
                ? `https://crombiegram-s3.s3.sa-east-1.amazonaws.com/${profileImage}`
                : ""
            }
            sx={{
              position: "relative",

              height: { sm: 100, xs: 50 },
              width: { sm: 100, xs: 50 },
              borderRadius: 50,
              border: 5,
              borderColor: "#8e44ad",
              ml: 2,
              mt: 2,
            }}
            title="profile"
          />
          <Stack direction="column" spacing={1} sx={{ m: 3 }}>
            <Typography variant="h5">
              {firstName} {lastName}
            </Typography>
            <Typography>{position}</Typography>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
};

export default UserCard;
