import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import SwitchTheme from "@/components/SwitchTheme";
import Image from "next/image";
import { useRouter } from "next/router";
import { fetcher } from "@/utils/fetcher";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { Snackbar } from "@mui/material";

interface FormRegister {
  email: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
  birthday: Date;
}

const registerSchema = yup.object({
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
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Repeat password is a required field."),
  firstName: yup.string().required("Firstname is a required field."),
  lastName: yup.string().required("Lastname is a required field."),
  birthday: yup.string().required("Birthday is a required field."),
});

function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegister>({ resolver: yupResolver(registerSchema) });
  const [alert, setAlert] = useState(false);
  const [open, setOpen] = React.useState(false);

  const onSubmit = handleSubmit(async (data) => {
    const jsonResponse = await fetcher("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });

    setAlert(jsonResponse.message);
    setOpen(true);
    setTimeout(() => router.push("/login"), 500);
  });

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
        component={"form"}
        onSubmit={onSubmit}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          pl: 1,
          pr: 1,
          pb: 3,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 2, md: 3 },
          }}
        >
          <Box
            sx={{
              maxWidth: 380,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
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

            <TextField
              label="Repeat Password"
              helperText={
                !errors.repeatPassword ? " " : errors.repeatPassword?.message
              }
              error={errors?.repeatPassword?.message ? true : false}
              variant="outlined"
              type="password"
              {...register("repeatPassword", { required: true })}
              fullWidth
            />
          </Box>
          <Box
            sx={{
              maxWidth: 380,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <TextField
              label="First Name"
              variant="outlined"
              helperText={!errors.firstName ? " " : errors.firstName?.message}
              error={errors?.firstName?.message ? true : false}
              {...register("firstName", { required: true })}
              fullWidth
            />
            <TextField
              label="Last Name"
              variant="outlined"
              helperText={!errors.lastName ? " " : errors.lastName?.message}
              error={errors?.lastName?.message ? true : false}
              {...register("lastName", { required: true })}
              fullWidth
            />
            <TextField
              id="date"
              label="Birthday"
              helperText={!errors.birthday ? " " : errors.birthday?.message}
              error={errors?.birthday?.message ? true : false}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("birthday", { required: true })}
              fullWidth
            />
          </Box>
        </Box>
        <Button variant="outlined" color="secondary" type="submit">
          Register
        </Button>
      </Box>
      {alert && (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert variant="outlined" severity="success">
            {alert}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}

export default Register;
