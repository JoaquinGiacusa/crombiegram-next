import useUsers from "@/hooks/useUsers";
import { Avatar, Box, Card, CardMedia, Stack, Typography } from "@mui/material";
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
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        borderRadius: 5,
        width: "100%",
        maxWidth: 500,
        // minWidth: 350,
        padding: 1,
        // pl: 8,
      }}
      elevation={10}
    >
      <Avatar
        src={
          profileImage
            ? `https://crombiegram-s3.s3.sa-east-1.amazonaws.com/${profileImage}`
            : ""
        }
        sx={{
          position: "relative",

          height: { sm: 100, xs: 80 },
          width: { sm: 100, xs: 80 },
          borderRadius: 50,
          border: 5,
          borderColor: "#8e44ad",
        }}
      />
      <Stack direction="column" spacing={1} sx={{ m: 3 }}>
        <Typography variant="h5">
          {firstName} {lastName}
        </Typography>
        <Typography>{position}</Typography>
      </Stack>
    </Card>
  );
};

export default UserCard;
