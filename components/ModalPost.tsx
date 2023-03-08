import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import CommentList from "./CommentList";
import SubHeaderPost from "./SubHeaderPost";
import { useForm } from "react-hook-form";
import { fetcher } from "@/utils/fetcher";
import SendIcon from "@mui/icons-material/Send";
import { usePostComments } from "@/hooks/usePostComments";

const ModalPost: React.FC<any> = ({
  id,
  userId,
  firstName,
  lastName,
  contentText,
  imageName,
  profileImage,
  createdAt,
  position,
  comment,
  like,
  open,
  setOpen,
}) => {
  const router = useRouter();
  const { data, mutate } = usePostComments(id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const onSubmit = handleSubmit(async (data) => {
    const body = {
      comment: data.comment,
    };
    reset();
    await fetcher(`/comment/post/${id}`, {
      method: "POST",
      body: JSON.stringify(body),
      credentials: "include",
    }).then((data) => {
      mutate();
    });
  });

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  return (
    <Modal
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={open}
      onClose={(e) => {
        setOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack direction="row">
        <Box>
          {imageName && (
            <Image
              width={700}
              height={700}
              src={
                "https://crombiegram-s3.s3.sa-east-1.amazonaws.com/" + imageName
              }
              alt="foto"
            />
          )}
        </Box>
        <Box
          sx={{
            height: "700px",
            display: "flex",
            flexDirection: "column",
            width: !imageName ? "700px" : "auto",
          }}
        >
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <CardHeader
                avatar={
                  <Avatar
                    src={
                      profileImage
                        ? `https://crombiegram-s3.s3.sa-east-1.amazonaws.com/${profileImage}`
                        : ""
                    }
                    sx={{ width: 30, height: 30 }}
                  />
                }
                title={firstName + " " + lastName}
                subheader={
                  <SubHeaderPost createdAt={createdAt} position={position} />
                }
                onClick={() => router.push(`/contact/${id}`)}
                sx={{ cursor: "pointer" }}
              />
              <Typography variant="body2" color="text.secondary" pl={2}>
                {contentText}
              </Typography>
              {data && data?.flat().length > 0 && <CommentList postId={id} />}
            </Box>
            <Box component={"form"} onSubmit={onSubmit}>
              <TextField
                fullWidth
                sx={{ p: 1 }}
                {...register("comment", { required: true })}
                InputProps={{
                  endAdornment: (
                    <IconButton type="submit">
                      <SendIcon />
                    </IconButton>
                  ),
                }}
              ></TextField>
            </Box>
          </Card>
        </Box>
      </Stack>
    </Modal>
  );
};
export default ModalPost;
