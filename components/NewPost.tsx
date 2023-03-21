import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DateRange from "@mui/icons-material/DateRange";
import EmojiEmotions from "@mui/icons-material/EmojiEmotions";
import ImageIcon from "@mui/icons-material/Image";
import Image from "next/image";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Box from "@mui/system/Box";
import IconButton from "@mui/material/IconButton";
import { fetcher } from "@/utils/fetcher";
import { useForm } from "react-hook-form";
import useUser from "@/hooks/useUser";
import { usePost } from "@/hooks/usePost";

type NewPostType = {
  refresh: () => void;
};

const NewPost: React.FC<NewPostType> = ({ refresh }) => {
  const [open, setOpen] = useState(false);

  const [file, setFile] = useState<File | null>();

  const inputFile = useRef<any>(null);

  const { data, error, isLoading } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ defaultValues: { contentText: "" } });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setFile(e.target.files[0]);
  };

  const onSubmit = handleSubmit(async (data) => {
    let formData = new FormData();

    if (file) {
      formData.append("image", file, file?.name);
    }

    if (data.contentText) {
      formData.append("contentText", data.contentText);
    }

    const jsonResponse = await fetcher(
      "/post",
      {
        method: "POST",
        body: formData,
      },
      true
    );

    if (jsonResponse) {
      refresh();
    }

    reset();
    setOpen(false);
    setFile(null);
  });

  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Crear Post"
        sx={{
          position: "fixed",
          bottom: 30,
          right: { xs: "calc(50% - 25px)", sm: 40 },
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
        onClose={(e) => {
          setOpen(false), reset(), setFile(null);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component={"form"}
          onSubmit={onSubmit}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          minWidth={400}
          borderRadius={5}
        >
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
                data?.profileImage
              }
              sx={{ width: 30, height: 30 }}
            />
            <Typography fontWeight={500}>
              {data?.firstName} {data?.lastName}
            </Typography>
          </Box>

          <TextField
            {...register("contentText", { required: true })}
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            multiline
            minRows={3}
            maxRows={7}
            placeholder="What's on your mind?"
            variant="standard"
          />
          {file && (
            <Stack
              sx={{ position: "relative", right: 1 }}
              flexDirection={"column"}
              alignItems="center"
            >
              <Image
                src={URL.createObjectURL(
                  new Blob([file], { type: "application/zip" })
                )}
                alt=""
                width={350}
                height={200}
                style={{ marginTop: "15px" }}
              />
              <Typography
                sx={{
                  position: "absolute",
                  right: 10,
                  top: 10,
                  cursor: "pointer",
                }}
                onClick={() => setFile(null)}
              >
                x
              </Typography>
            </Stack>
          )}
          <Stack direction="row" gap={1} mb={2}>
            <input
              style={{ display: "none" }}
              type="file"
              onChange={handleChange}
              ref={inputFile}
            />

            <IconButton onClick={() => inputFile.current!.click()}>
              <ImageIcon color="secondary" />
            </IconButton>
          </Stack>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: 1,
              justifyContent: "center",
            }}
          >
            <Button
              type="submit"
              variant="outlined"
              disabled={!watch("contentText")}
            >
              Crear
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default NewPost;
