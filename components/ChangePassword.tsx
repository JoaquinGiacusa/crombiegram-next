import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as yup from "yup";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { fetcher } from "@/utils/fetcher";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

interface FormEditPassword {
  currPassword: string;
  newPassword: string;
  repeatedNewPassword: string;
}

const editPasswordSchema = yup.object({
  currPassword: yup
    .string()
    .required("Password is a required field.")
    .min(8, "Password must contain 8 or more characters")
    .matches(/\d/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  newPassword: yup
    .string()
    .required("Password is a required field.")
    .min(8, "Password must contain 8 or more characters")
    .matches(/\d/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  repeatedNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Repeat password is a required field."),
});

const ChangePassword = () => {
  const [modalPswOpen, setModalPswOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState(true);
  const [alert, setAlert] = useState(false);

  const handleTogglePassword = () => {
    setModalPswOpen(!modalPswOpen);
  };
  const {
    register: registerPsw,
    handleSubmit: handleSubmitPsw,
    formState: { errors: errorsPws },
    reset,
  } = useForm<FormEditPassword>({ resolver: yupResolver(editPasswordSchema) });
  const onSubmitFormPassword = handleSubmitPsw(async (data) => {
    await fetcher("/user/me/password", {
      method: "PATCH",
      body: JSON.stringify(data),
    }).then((data) => {
      setAlert(data.message);
      setOpenAlert(true);
      setSeverity(false);
      if (data.message == "Your password has been updated!") {
        setSeverity(true);
        setModalPswOpen(false);
        reset();
      }
    });
  });

  return (
    <>
      <Button color="info" type="button" onClick={handleTogglePassword}>
        Change password
      </Button>
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

export default ChangePassword;
