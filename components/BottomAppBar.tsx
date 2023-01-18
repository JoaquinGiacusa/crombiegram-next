import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { Toolbar } from "@mui/material";
// import NewPost from "./NewPost";
import Link from "next/link";

const BottomAppBar = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
          }}
        >
          <Link href={"/home"}>
            <IconButton color="primary" key="home">
              <HomeIcon fontSize="large" />
            </IconButton>
          </Link>
          <Link href={"/home"}>
            <IconButton color="primary" key="events">
              <CalendarMonthIcon fontSize="large" />
            </IconButton>
          </Link>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
          }}
        >
          <Link href={"/home"}>
            <IconButton color="primary" key="network">
              <GroupIcon fontSize="large" />
            </IconButton>
          </Link>
          <Link href={"/home"}>
            <IconButton color="primary" key="search">
              <SearchIcon fontSize="large" />
            </IconButton>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default BottomAppBar;
