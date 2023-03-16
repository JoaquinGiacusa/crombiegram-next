import React from "react";
import Link from "next/link";
import SwitchTheme from "./SwitchTheme";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/system/Stack";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupIcon from "@mui/icons-material/Group";
import BottomAppBar from "./BottomAppBar";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Logout } from "@mui/icons-material";
import { useRouter } from "next/router";
import useUser from "@/hooks/useUser";
import PersonIcon from "@mui/icons-material/Person";
import { deleteCookie } from "cookies-next";
import Image from "next/image";

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { data, error, isLoading } = useUser();

  const router = useRouter();
  const handleLogout = () => {
    deleteCookie("authToken");
    deleteCookie("authExpires");

    router.push("/");
  };

  return (
    <AppBar position="static">
      <Toolbar
        disableGutters
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pl: 2,
          pr: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "start" },

            width: { xs: "100%", md: "200px" },
            alignItems: "center",
          }}
        >
          <Image
            src="/images/crombie-logo.png"
            alt="Crombie-logo"
            width={40}
            height={40}
          />

          <Typography
            variant="h6"
            sx={{
              ml: 1,
              display: "inherit",
              fontFamily: "VT323",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "primary",
              textDecoration: "none",
              justifyItems: "start",
            }}
          >
            <Link style={{ color: "white " }} href={"/home"}>
              Crombiegram
            </Link>
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", sm: "none" },
          }}
        >
          <BottomAppBar />
        </Box>
        <Box
          sx={{
            // width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "flex-end",
              justifyContent: "space-between",
              // gap: 2,
              maxWidth: 200,
            }}
          >
            <IconButton color="primary" key="home" href="/home">
              <HomeIcon fontSize="large" />
            </IconButton>
            <IconButton color="primary" key="network" href="/network">
              <GroupIcon fontSize="large" />
            </IconButton>
          </Box>
          <Box
            sx={{
              // width: "100%",
              display: "flex",
              flexDirection: "row",
              // alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Stack spacing={3} direction="row">
              <SwitchTheme />

              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={data?.firstName}
                    src={
                      data?.profileImage
                        ? "https://crombiegram-s3.s3.sa-east-1.amazonaws.com/" +
                          data?.profileImage
                        : ""
                    }
                  />
                </IconButton>
              </Tooltip>
            </Stack>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link href={"/profile"} style={{ color: "none" }}>
                <MenuItem>
                  <ListItemIcon>
                    <PersonIcon />
                    <Typography textAlign="center">Profile</Typography>
                  </ListItemIcon>
                </MenuItem>
              </Link>

              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                  <Typography textAlign="center">Logout</Typography>
                </ListItemIcon>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;
