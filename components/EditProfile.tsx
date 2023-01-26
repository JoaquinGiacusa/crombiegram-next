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
} from "@mui/material";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import { useForm } from "react-hook-form";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import AddImage from "./AddImage";
import { fetcher } from "@/utils/fetcher";
import Add from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";

const EditProfile = () => {
  const [open, setOpen] = useState(false);

  const [file, setFile] = useState<File | null>();
  const inputFile = useRef<any>(null);
  const { data, error, isLoading, mutate } = useUser();
  console.log("FECHA", moment(data?.user.birthday).format("DD-MM-YYYY"));

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
        method: "POST",
        body: formData,
      },
      true
    );

    if (jsonResponse) {
      mutate();
    }
  };

  const handleFetch = useFetch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<any>({ defaultValues: { password: "" } });
  //   const navigate = useNavigate();
  const [alert, setAlert] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    const jsonResponse = await handleFetch({
      path: "user/me",
      data,
      method: "PUT",
    });

    setAlert(jsonResponse.message);
    setOpen(false);
  });
  console.log(data?.user.birthday);
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
            <Stack direction="row" spacing={1}>
              <Button
                color="primary"
                aria-label="edit"
                onClick={() => inputFile.current!.click()}
              >
                {file ? (
                  <EditIcon fontSize="small" />
                ) : (
                  <Add fontSize="small" />
                )}
              </Button>

              {file ? (
                <Button
                  color="primary"
                  aria-label="edit"
                  onClick={handleSubmitImage}
                >
                  <Add fontSize="small" />
                </Button>
              ) : (
                ""
              )}
            </Stack>
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
                  defaultValue={moment(data?.user.birthday).format(
                    "DD-MM-YYYY"
                  )}
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
                  href={"/"}
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
