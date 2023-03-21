import React, { useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import {
  Modal,
  Box,
  TextField,
  Button,
  Alert,
  Stack,
  Snackbar,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import { fetcher } from "@/utils/fetcher";
import Add from "@mui/icons-material/Add";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import ChangePassword from "./ChangePassword";
interface FormEditUser {
  email: string;
  position: string;
  firstName: string;
  lastName: string;
  birthday: Date;
}

const editUserSchema = yup.object({
  email: yup
    .string()
    .required("Email is a required field.")
    .email("Invalid email address."),
  position: yup.string(),
  firstName: yup.string().required("Firstname is a required field."),
  lastName: yup.string().required("Lastname is a required field."),
  birthday: yup.date().required().typeError("Birthday is invalid."),
});

const EditProfile = ({ refreshPost }: { refreshPost: () => void }) => {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const [file, setFile] = useState<File | null>();
  const inputFile = useRef<any>(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState(true);
  const { data, error, isLoading, mutate } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setFile(e.target.files[0]);
  };

  const handleSubmitImage = async () => {
    let formData = new FormData(); //formdata object
    if (file) {
      formData.append("profileImage", file, file?.name); //append the values with key, value pair
    }
    const jsonResponse = await fetcher(
      "/user/me/image",
      {
        method: "PATCH",
        body: formData,
      },
      true
    );
    if (jsonResponse) {
      mutate();
      refreshPost();
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<FormEditUser>({ resolver: yupResolver(editUserSchema) });
  const onSubmit = handleSubmit(async (data) => {
    await fetcher("/user/me", {
      method: "PUT",
      body: JSON.stringify(data),
    }).then((data) => {
      setAlert(data.message);
      setOpenAlert(true);
      if (data.message == "Your account has been updated!") {
        mutate();
        setOpen(false);
      } else {
        setSeverity(false);
        setOpen(false);
      }
      // setAlert(data.message);
    });
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
        onClose={(e) => {
          return setOpen(false), setFile(null);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
          sx={{
            height: { xs: "100vh", md: "auto" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {file ? (
            <Image
              style={{ borderRadius: "10px" }}
              src={
                file
                  ? URL.createObjectURL(
                      new Blob([file], { type: "application/zip" })
                    )
                  : "/images/crombie-logo.png"
              }
              alt="profile-img"
              height={250}
              width={250}
            />
          ) : (
            <Image
              style={{ borderRadius: "10px" }}
              src={
                data?.profileImage
                  ? "https://crombiegram-s3.s3.sa-east-1.amazonaws.com/" +
                    data?.profileImage
                  : "/images/crombie-logo.png"
              }
              alt="profile-img"
              height={250}
              width={250}
            />
          )}
          <input
            style={{ display: "none" }}
            type="file"
            onChange={handleChange}
            ref={inputFile}
          />
          <Stack direction="row" spacing={1} mt={1} mb={4}>
            <Button
              color="primary"
              aria-label="edit"
              onClick={() => inputFile.current!.click()}
            >
              {file ? <Edit fontSize="small" /> : <Add fontSize="small" />}
            </Button>
            <Button
              color="primary"
              aria-label="edit"
              // variant="contained"
              disabled={file ? false : true}
              onClick={handleSubmitImage}
            >
              Update Image
            </Button>
          </Stack>

          <Box
            component={"form"}
            onSubmit={onSubmit}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "flex-start",
                gap: { xs: 2, md: 3 },
              }}
            >
              <Box
                sx={{
                  maxWidth: 380,
                  width: "100%",
                  display: "flex",
                  justifyContent: "start",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 2,
                }}
              >
                <TextField
                  fullWidth
                  helperText={!errors.email ? " " : errors.email?.message}
                  error={errors?.email?.message ? true : false}
                  {...register("email", { required: true })}
                  defaultValue={data?.email}
                  type={"email"}
                  label="Email"
                />
                <TextField
                  label="First Name"
                  variant="outlined"
                  helperText={
                    !errors.firstName ? " " : errors.firstName?.message
                  }
                  error={errors?.firstName?.message ? true : false}
                  {...register("firstName", { required: true })}
                  defaultValue={data?.firstName}
                  fullWidth
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  helperText={!errors.lastName ? " " : errors.lastName?.message}
                  error={errors?.lastName?.message ? true : false}
                  {...register("lastName", { required: true })}
                  defaultValue={data?.lastName}
                  fullWidth
                />
              </Box>
              <Box
                sx={{
                  maxWidth: 380,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <TextField
                  id="position"
                  label="Position"
                  error={errors?.position?.message ? true : false}
                  helperText={!errors.position ? " " : errors.position?.message}
                  {...register("position")}
                  fullWidth
                  defaultValue={data?.position}
                />

                <Controller
                  name={"birthday"}
                  control={control}
                  defaultValue={data?.birthday}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DesktopDatePicker
                        label={"Birthday"}
                        inputFormat="DD-MM-yyyy"
                        value={value}
                        onChange={(event) => {
                          onChange(event);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={!!error}
                            helperText={error?.message}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Box>
            </Box>
            <Button
              variant="outlined"
              color="warning"
              type="submit"
              // disabled={!watch("firstName")}
            >
              Update
            </Button>
          </Box>

          <ChangePassword />
        </Box>
      </Modal>

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
    </>
  );
};
export default EditProfile;
