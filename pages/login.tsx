import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import SwitchTheme from "@/components/SwitchTheme";
import Image from "next/image";
import { useRouter } from "next/router";
import { fetcher } from "@/utils/fetcher";
import { setCookie } from "cookies-next";
import moment from "moment";

interface IFormInput {
  email: string;
  password: string;
}

function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const onSubmit = handleSubmit(async (data) => {
    const jsonResponse = await fetcher("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    });

    const { payload } = jsonResponse;

    if (jsonResponse.message == "Login successful") {
      setCookie("authToken", payload.authCookie);
      setCookie("authExpires", payload.expires);

      setTimeout(() => router.push("/home"), 500);
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

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
      <Box
        onSubmit={onSubmit}
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 500,
          ml: 1,
          mr: 1,
        }}
      >
        <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
          <OutlinedInput
            {...register("email", { required: true })}
            // id="outlined-adornment-email"
            type={"text"}
            label="Email"
          />
        </FormControl>

        <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            {...register("password", { required: true })}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <Button variant="outlined" color="primary" type="submit">
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
