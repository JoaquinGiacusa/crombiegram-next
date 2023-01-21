import React, { useState } from "react";
import Box from "@mui/system/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Edit from "@mui/icons-material/Edit";
import MainLayout from "@/components/layouts/mainLayout";
import Image from "next/image";
import { Button, IconButton } from "@mui/material";
import useUser from "@/hooks/useUser";
import EditProfile from "@/components/EditProfile";
import NewPost from "@/components/NewPost";

const Profile = () => {
  const { data } = useUser();
  // const [reFetchPost, setReFetchPost] = useState(0);
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
            <Typography>Full Stack Developer</Typography>
          </Box>
        </Card>
      </Box>
    </MainLayout>
  );
};

export default Profile;
