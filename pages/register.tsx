import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import useFetch from "../hooks/useFetch";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import SwitchTheme from "@/components/SwitchTheme";
import Image from "next/image";
import { useRouter } from "next/router";

function Register() {
  const router = useRouter();

  const handleFetch = useFetch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //   const navigate = useNavigate();
  const [alert, setAlert] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    const jsonResponse = await handleFetch({
      path: "auth/signup",
      data,
      method: "POST",
    });

    setAlert(jsonResponse.message);
    setTimeout(() => router.push("/login"), 1000);
  });
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
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Grid
          container
          columns={2}
          maxWidth={900}
          spacing={2}
          padding="0px 50px"
        >
          <Grid item xs={2} md={1}>
            <TextField
              label="First Name"
              variant="outlined"
              {...register("firstName", { required: true })}
              fullWidth
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <TextField
              label="Last Name"
              variant="outlined"
              {...register("lastName", { required: true })}
              fullWidth
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <TextField
              label="Email"
              variant="outlined"
              {...register("email", { required: true })}
              fullWidth
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              {...register("password", { required: true })}
              fullWidth
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <TextField
              label="Repeat Password"
              variant="outlined"
              type="password"
              {...register("repeatPassword", { required: true })}
              fullWidth
            />
          </Grid>

          <Grid item xs={2} md={1}>
            <TextField
              id="date"
              label="Birthday"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("birthday", { required: true })}
              fullWidth
            />
          </Grid>
        </Grid>
        <Button variant="outlined" color="secondary" type="submit">
          Register
        </Button>
      </Box>
      {alert && <Alert severity="success">{alert}</Alert>}
    </Box>
  );
}

export default Register;
