import React, { useRef, useState } from "react";
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
  Typography,
  Snackbar,
} from "@mui/material";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import { fetcher } from "@/utils/fetcher";
import Add from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";
interface FormEditUser {
  email: string;
  position: string;
  firstName: string;
  lastName: string;
  birthday: Date;
}
interface FormEditPassword {
  currPassword: string;
  newPassword: string;
  repeatedNewPassword: string;
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

const editPasswordSchema = yup.object({
  currPassword: yup
    .string()
    .required("Password is a required field.")
    .min(8, "Password must contain 8 or more characters")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  newPassword: yup
    .string()
    .required("Password is a required field.")
    .min(8, "Password must contain 8 or more characters")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  repeatedNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Repeat password is a required field."),
});
const EditProfile = () => {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const [modalPswOpen, setModalPswOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
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
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormEditUser>({ resolver: yupResolver(editUserSchema) });
  const onSubmit = handleSubmit(async (data) => {
    // console.log(data);
    await fetcher("/user/me", {
      method: "PUT",
      body: JSON.stringify(data),
    }).then((data) => {
      console.log(data);

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
  const handleTogglePassword = () => {
    setModalPswOpen(!modalPswOpen);
  };
  const {
    register: registerPsw,
    handleSubmit: handleSubmitPsw,
    formState: { errors: errorsPws },
  } = useForm<FormEditPassword>({ resolver: yupResolver(editPasswordSchema) });
  const onSubmitFormPassword = handleSubmitPsw(async (data) => {
    await fetcher("/user/me/password", {
      method: "PATCH",
      body: JSON.stringify(data),
    })
      .then((data) => {
        if (data.message == "Your password has been updated!") {
        }
      })
      .then(() => {
        setModalPswOpen(false);
        setOpen(false);
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
              src={
                data?.user.profileImage
                  ? "https://crombiegram-s3.s3.sa-east-1.amazonaws.com/" +
                    data?.user.profileImage
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
              {file ? <EditIcon fontSize="small" /> : <Add fontSize="small" />}
            </Button>
            <Button
              color="primary"
              aria-label="edit"
              // variant="contained"
              disabled={file ? false : true}
              onClick={handleSubmitImage}
            >
              {/* <Add fontSize="small" /> */}
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
                  defaultValue={data?.user?.email}
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
                  defaultValue={data?.user?.firstName}
                  fullWidth
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  helperText={!errors.lastName ? " " : errors.lastName?.message}
                  error={errors?.lastName?.message ? true : false}
                  {...register("lastName", { required: true })}
                  defaultValue={data?.user?.lastName}
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
                  defaultValue={data?.user.position}
                />

                <Controller
                  name={"birthday"}
                  control={control}
                  defaultValue={data?.user.birthday}
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

                <Button
                  color="info"
                  type="button"
                  onClick={handleTogglePassword}
                >
                  Change password
                </Button>
              </Box>
            </Box>
            <Button variant="outlined" color="warning" type="submit">
              Update
            </Button>
          </Box>
          {/* {alert && <Alert severity="success">{alert}</Alert>} */}
        </Box>
      </Modal>
      <Modal
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={modalPswOpen}
        onClose={(e) => setModalPswOpen(false)}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box
          component={"form"}
          onSubmit={onSubmitFormPassword}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            // alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Actual password"
            error={errorsPws?.currPassword?.message ? true : false}
            helperText={
              !errorsPws.currPassword ? " " : errorsPws.currPassword?.message
            }
            {...registerPsw("currPassword", { required: true })}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
          <TextField
            fullWidth
            type={showNewPassword ? "text" : "password"}
            label="New password"
            error={errorsPws?.newPassword?.message ? true : false}
            helperText={
              !errorsPws.newPassword ? " " : errorsPws.newPassword?.message
            }
            {...registerPsw("newPassword", { required: true })}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
          <TextField
            label="Repeated new password"
            helperText={
              !errorsPws.repeatedNewPassword
                ? " "
                : errorsPws.repeatedNewPassword?.message
            }
            error={errorsPws?.repeatedNewPassword?.message ? true : false}
            variant="outlined"
            type="password"
            {...registerPsw("repeatedNewPassword", { required: true })}
            fullWidth
          />
          <Button
            sx={{ margin: "0 auto" }}
            variant="outlined"
            color="info"
            type="submit"
          >
            Update password
          </Button>
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
