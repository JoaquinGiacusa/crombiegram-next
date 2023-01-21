import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import {
  Modal,
  Box,
  Grid,
  TextField,
  Button,
  Alert,
  Stack,
} from "@mui/material";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import { useForm } from "react-hook-form";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import AddImage from "./AddImage";

const EditProfile = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data } = useUser();

  const [reFetchPost, setReFetchPost] = useState(0);

  const handleFetch = useFetch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<any>({ defaultValues: { password: "" } });
  //   const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  console.log(getValues());

  const onSubmit = handleSubmit(async (data) => {
    const jsonResponse = await handleFetch({
      path: "user/me",
      data,
      method: "PUT",
    });

    setAlert(jsonResponse.message);
    setOpen(false);
  });
  return (
    <>
      <IconButton
        color="primary"
        aria-label="edit"
        sx={{
          position: "relative",
          ml: { sm: "90%", xs: "87%" },
          mb: 1,
        }}
        onClick={(e) => setOpen(true)}
      >
        <Edit fontSize="small" />
      </IconButton>
      <Modal
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
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
            bgcolor={"background.default"}
            color={"text.primary"}
            p={3}
            borderRadius={5}
          >
            <Image
              src="/images/crombie-logo.png"
              alt="profile-img"
              height={250}
              width={250}
            />
            <AddImage />
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
                  defaultValue={data?.user.firstName}
                />
              </Grid>
              <Grid item xs={2} md={1}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  {...register("lastName", { required: true })}
                  fullWidth
                  defaultValue={data?.user.lastName}
                />
              </Grid>
              <Grid item xs={2} md={1}>
                <TextField
                  label="Email"
                  variant="outlined"
                  {...register("email", { required: true })}
                  fullWidth
                  defaultValue={data?.user.email}
                />
              </Grid>
              {/* <Grid item xs={2} md={1}>
                <TextField
                  label="Actual Password"
                  variant="outlined"
                  type="password"
                  {...register("password", { required: false })}
                  fullWidth
                  inputProps={{
                    autocomplete: "new-password",
                  }}
                />
              </Grid>
              <Grid item xs={2} md={1}>
                <TextField
                  label="New Password"
                  variant="outlined"
                  type="password"
                  {...register("repeatPassword", { required: true })}
                  fullWidth
                />
              </Grid> */}

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
                  defaultValue={data?.user.birthday}
                />
              </Grid>
              <Grid item xs={2} md={1}>
                <TextField
                  id="position"
                  label="Position"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("position", { required: true })}
                  fullWidth
                  defaultValue={data?.user.position}
                />
              </Grid>
              <Grid item xs={2} md={1}>
                <Link
                  style={{ color: "#fc427b", fontSize: 16, marginLeft: 10 }}
                  href={"/home"}
                >
                  Change Password
                </Link>
              </Grid>
            </Grid>
            <Button variant="outlined" color="warning" type="submit">
              Update
            </Button>
          </Box>
          {alert && <Alert severity="success">{alert}</Alert>}
        </Box>
      </Modal>
    </>
  );
};

export default EditProfile;
