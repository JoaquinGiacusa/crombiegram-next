import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/system/Stack";
import React, { useState } from "react";
// import { Navigate, Outlet, Route } from "react-router-dom";
import Image from "next/image";
import Title from "../components/Title";
import Link from "next/link";
import SwitchTheme from "../components/SwitchTheme";

function Start() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ alignSelf: "flex-end", mr: 2, mt: 2 }}>
        <SwitchTheme />
      </Box>
      <Image
        src="/images/crombie-logo.png"
        alt="logo"
        width={225}
        height={225}
      />

      <Title />
      <Stack direction="row" spacing={2}>
        <Link href={"/login"}>
          <Button variant="outlined" color="primary">
            Login
          </Button>
        </Link>
        <Link href={"/register"}>
          <Button variant="outlined" color="secondary">
            Register
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}

export default Start;
