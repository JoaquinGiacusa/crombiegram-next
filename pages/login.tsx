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
  password: yup.string().required("Password is a required field."),
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

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState(true);

  const onSubmit = handleSubmit(async (data) => {
    setOpen(true);

    await fetcher("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    }).then((data) => {
      const { payload } = data;

      if (data.message == "Login successful") {
        setOpenAlert(true);
        setAlert(data.message);
        setCookie("authToken", payload.authCookie, {
          maxAge: 60 * 60 * 24 * 7,
        });
        setCookie("authExpires", payload.expires, {
          maxAge: 60 * 60 * 24 * 7,
        });
        setSeverity(true);
        setOpen(true);
        router.push("/home");
      } else {
        setOpenAlert(true);
        setAlert(data.message);
        setSeverity(false);
        setOpen(false);
      }
    });
  });

  const [showPassword, setShowPassword] = useState(false);

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
          padding: 1,
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

        <Snackbar
          sx={{ alignItems: "center", justifyContent: "center" }}
          open={openAlert}
          autoHideDuration={2000}
          onClose={() => setOpenAlert(false)}
        >
          <Alert
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            variant="outlined"
            severity={severity ? "success" : "error"}
          >
            {alert}
          </Alert>
        </Snackbar>
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
