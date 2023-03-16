import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { Stack, Toolbar } from "@mui/material";
import Link from "next/link";

const BottomAppBar = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Stack
          sx={{
            flexGrow: 1,
            display: { xs: "flex", sm: "none" },
            alignItems: "center",

            flexDirection: "row",
            justifyContent: "space-evenly",
            gap: 7,
          }}
        >
          <Link href={"/home"}>
            <IconButton color="primary" key="home">
              <HomeIcon fontSize="large" />
            </IconButton>
          </Link>
          <Link href={"/network"}>
            <IconButton color="primary" key="network">
              <GroupIcon fontSize="large" />
            </IconButton>
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default BottomAppBar;
