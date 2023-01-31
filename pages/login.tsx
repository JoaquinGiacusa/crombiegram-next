import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import SwitchTheme from "@/components/SwitchTheme";
import Image from "next/image";
import { useRouter } from "next/router";
import { fetcher } from "@/utils/fetcher";
import { setCookie } from "cookies-next";
import Alert from "@mui/material/Alert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Backdrop, Snackbar, TextField } from "@mui/material";

const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is a required field.")
    .email("Invalid email address."),
  password: yup
    .string()
    .required("Password is a required field.")
    .min(8, "Password must contain 8 or more characters")
    .matches(/\d/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
});

interface FormLogin {
  email: string;
  password: string;
}

function Login() {
  const [alert, setAlert] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLogin>({ resolver: yupResolver(loginSchema) });

  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = useState(true);

  const onSubmit = handleSubmit(async (data) => {
    setOpen(true);

    await fetcher("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((data) => {
        const { payload } = data;

        if (data.message == "Login successful") {
          setAlert(data.message);
          setCookie("authToken", payload.authCookie);
          setCookie("authExpires", payload.expires);
          setSeverity(true);
          setOpen(true);
        } else {
          setAlert(data.message);
          setSeverity(false);
          setOpen(true);
        }
      })
      .then(() => {
        router.push("/home");
      });
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
          maxWidth: 380,
          width: "100%",
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          helperText={!errors.email ? " " : errors.email?.message}
          error={errors?.email?.message ? true : false}
          {...register("email", { required: true })}
          type={"email"}
          label="Email"
        />
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          label="Password"
          error={errors?.password?.message ? true : false}
          helperText={!errors.password ? " " : errors.password?.message}
          {...register("password", { required: true })}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        />

        <Button variant="outlined" color="primary" type="submit">
          Login
        </Button>
        {alert && (
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert variant="outlined" severity={severity ? "success" : "error"}>
              {alert}
            </Alert>
          </Snackbar>
        )}
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}

export default Login;
