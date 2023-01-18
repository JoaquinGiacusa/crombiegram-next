import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Fab from "@mui/material/Fab";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { ChangeEventHandler, useRef, useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import DateRange from "@mui/icons-material/DateRange";
import EmojiEmotions from "@mui/icons-material/EmojiEmotions";
import Image from "@mui/icons-material/Image";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Box from "@mui/system/Box";
import IconButton from "@mui/material/IconButton";
// import fetchAPI from "../lib/apiFetch";
import useFetch from "../hooks/useFetch";
import { useUserContext } from "../context/UserContext";
import { useForm } from "react-hook-form";

type NewPostProps = {
  onAdd: () => void;
};

const NewPost: React.FC<NewPostProps> = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>();

  const { firstName, lastName, profileImage } = useUserContext();

  const inputFile = useRef<any>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { contentText: "" } });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setFile(e.target.files[0]);
  };

  const handleImage = () => {
    let formData = new FormData(); //formdata object

    formData.append("file", "ABC"); //append the values with key, value pair

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
  };

  const handleFetch = useFetch();
  const onSubmit = handleSubmit(async (data) => {
    const jsonResponse = await handleFetch({
      path: "post",
      data: { ...data, file },
      method: "POST",
    });

    console.log("jsonResponse", jsonResponse);
    if (jsonResponse) {
      onAdd();
    }

    setOpen(false);
  });

  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Crear Post"
        sx={{
          position: "fixed",
          bottom: 30,
          right: { xs: "calc(50% - 25px)", md: 30 },
          zIndex: 1111,
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
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
          component={"form"}
          onSubmit={onSubmit}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
        >
          {/* <Typography variant="h6" color="gray" textAlign="center">
            Create post
          </Typography> */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "15px",
            }}
          >
            <Avatar
              src={
                "https://crombiegram-s3.s3.sa-east-1.amazonaws.com/" +
                profileImage
              }
              sx={{ width: 30, height: 30 }}
            />
            <Typography fontWeight={500}>
              {firstName} {lastName}
            </Typography>
          </Box>

          <TextField
            {...register("contentText", { required: true })}
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            multiline
            // rows={3}
            minRows={3}
            maxRows={7}
            placeholder="What's on your mind?"
            variant="standard"
          />
          {file && (
            <Box>
              <img
                src={URL.createObjectURL(
                  new Blob([file], { type: "application/zip" })
                )}
                alt=""
                width={150}
                height={120}
                style={{ marginTop: "15px" }}
              />
              <Button onClick={() => setFile(null)}>x</Button>
            </Box>
          )}
          <Stack direction="row" gap={1} mb={2}>
            <IconButton>
              <EmojiEmotions color="primary" />
            </IconButton>
            <input
              style={{ display: "none" }}
              type="file"
              onChange={handleChange}
              ref={inputFile}
            />

            <IconButton onClick={() => inputFile.current!.click()}>
              <Image color="secondary" />
            </IconButton>

            <IconButton>
              <PersonAdd color="error" />
            </IconButton>
          </Stack>
          <Box
            // variant="contained"
            // size="medium"
            // fullWidth
            // aria-label="outlined primary button group"
            sx={{
              width: "100%",
              display: "flex",
              gap: 1,
              justifyContent: "center",
            }}
          >
            <Button type="submit" variant="outlined">
              Crear
            </Button>
            <Button variant="outlined">
              <DateRange />
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default NewPost;
