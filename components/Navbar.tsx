import React, { useEffect } from "react";
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
import { useUserContext } from "../context/UserContext";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { Button, ListItemIcon } from "@mui/material";
import useFetch from "../hooks/useFetch";
import { Logout } from "@mui/icons-material";
import { useRouter } from "next/router";

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget);
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { firstName, profileImage, token, handleSetValues } = useUserContext();

  const handleFetch = useFetch();
  useEffect(() => {
    if (token != "") {
      const jsonResponse = handleFetch({
        path: "user/me",
        method: "GET",
      }).then((res) => {
        const { user } = res;
        handleSetValues("firstName", user.firstName);
        handleSetValues("lastName", user.lastName);
        handleSetValues("email", user.email);
        handleSetValues("profileImage", user.profileImage);
      });
    }
  }, [token]);

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    // marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: "100%",
    maxWidth: "800px",
    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: theme.spacing(3),
    //   width: "auto",
    // },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        // width: "20ch",
      },
    },
  }));

  const router = useRouter();
  const handleLogout = () => {
    // const jsonResponse = handleFetch({
    //   path: "auth/login",
    //   method: "DELETE",
    // });
    localStorage.removeItem("token");
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
        <Box sx={{ display: "flex" }}>
          <Avatar src="images/crombie-logo.png" variant="square" />
          <Typography
            variant="h6"
            sx={{
              ml: 1,
              display: { xs: "none", md: "inherit" },
              fontFamily: "VT323",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "primary",
              textDecoration: "none",
            }}
          >
            <Link style={{ color: "white " }} href={"/home"}>
              Crombiegram
            </Link>
          </Typography>
        </Box>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
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
            <IconButton
              color="primary"
              key="home"
              // onClick={handleCloseNavMenu}
              href="/home"
            >
              <HomeIcon fontSize="large" />
            </IconButton>
            <IconButton
              color="primary"
              key="events"
              // onClick={handleCloseNavMenu}
            >
              <CalendarMonthIcon fontSize="large" />
            </IconButton>
            <IconButton
              color="primary"
              key="network"
              // onClick={handleCloseNavMenu}
            >
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
                    alt={firstName}
                    src={
                      profileImage
                        ? "https://crombiegram-s3.s3.sa-east-1.amazonaws.com/" +
                          profileImage
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
              <MenuItem key="profile">
                <Link href={"/profile"}>
                  <ListItemIcon>
                    <Typography textAlign="center">Profile</Typography>
                  </ListItemIcon>
                </Link>
              </MenuItem>

              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;