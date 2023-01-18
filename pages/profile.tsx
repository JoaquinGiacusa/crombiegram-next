import React from "react";
import Box from "@mui/system/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Edit from "@mui/icons-material/Edit";
import { useUserContext } from "../context/UserContext";
import MainLayout from "@/components/layouts/mainLayout";
import Image from "next/image";

const Profile = () => {
  const { firstName, lastName, profileImage } = useUserContext();
  console.log({ firstName });
  return (
    <MainLayout>
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
            // ml: "20%",
            // mr: "20%",
          }}
          elevation={10}
        >
          {/* <Image
          src="images/colors.png"
          height={250}
          width={1250}
          fit="fill"
          duration={0}
          easing="cubic-bezier(0.7, 0, 0.6, 1)"
          showLoading={false}
          errorIcon={true}
          shift={null}
          distance="100px"
          shiftDuration={900}
          bgColor="inherit"
        
        /> */}
          {/* 
        <CardMedia
          image="images/colors.png"
          sx={{
            height: { sm: 200, xs: 150 },
            width: "100%",
          }}
        /> */}
          <Image src="/images/colors.png" height={160} width={700} alt="" />

          <CardMedia
            image={
              profileImage
                ? `https://crombiegram-s3.s3.sa-east-1.amazonaws.com/${profileImage}`
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
              mt: -9,
            }}
            title="profile"
          />
          <Box sx={{ m: 5 }}>
            <Typography variant="h5">
              {firstName} {lastName}
            </Typography>
            <Typography>Full Stack Developer</Typography>
          </Box>
          <Fab
            color="primary"
            aria-label="edit"
            sx={{
              position: "relative",
              ml: { sm: "90%", xs: "87%" },
              mb: 1,
            }}
          >
            <Edit fontSize="small" />
          </Fab>
        </Card>
      </Box>
    </MainLayout>
  );
};

export default Profile;
