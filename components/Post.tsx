import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import IconButton from "@mui/material/IconButton";
import SubHeaderPost from "./SubHeaderPost";
import Image from "next/image";
import { fetcher } from "@/utils/fetcher";
import { PostProps, usePost } from "@/hooks/usePost";
import {
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/system/Box";
import { useForm } from "react-hook-form";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import ModalPost from "./ModalPost";
import moment from "moment";

export type PostPropsType = {
  dataPost: PostProps;
};
// export type PostPropsType = {
//   id: string;
//   userId: string;
//   firstName: string;
//   lastName: string;
//   contentText: string;
//   imageName?: string;
//   profileImage: string;
//   createdAt: Date;
//   position?: string;
//   like: {
//     id: string;
//     postId: string;
//     user: { firstName: string; lastName: string; profileImage: string };
//     userId: string;
//   }[];
//   comment?: {
//     id: string;
//     comment: string;
//     userId: string;
//     postId: string;
//     createdAt: Date;
//     user: {
//       firstName: string;
//       lastName: string;
//       profileImage?: string;
//       position?: string;
//     };
//   }[];
// };

const Post = ({ dataPost }: { dataPost: PostProps }) => {
  const { data } = useUser();
  const [isLiked, setIsLiked] = useState<boolean>();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [postData, setPostData] = useState<PostProps>();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    setPostData(dataPost);
  }, [dataPost]);

  const handleDelete = async () => {
    const jsonResponse = await fetcher(`/post/${postData?.id}`, {
      method: "DELETE",
    });
    if (jsonResponse) {
      await updatePost();
      // refresh();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const body = {
      comment: data.comment,
    };
    reset();
    await fetcher(`/comment/post/${postData?.id}`, {
      method: "POST",
      body: JSON.stringify(body),
      credentials: "include",
    }).then(async (data) => {
      // refresh();
      await updatePost();
    });
  });

  const handleClickLike = async () => {
    setIsLiked(true);
    if (!isLiked) {
      const res = await fetcher(`/like/post/${postData?.id}`, {
        method: "POST",
        body: JSON.stringify({
          userId: data?.id,
        }),
      });

      if (res.like) {
        // refresh();
        await updatePost();
      }
    }

    if (isLiked) {
      setIsLiked(false);
      const res = await fetcher(`/like/post/${postData?.id}`, {
        method: "DELETE",
        body: JSON.stringify({
          userId: data?.id,
        }),
      });
      if (res.message == "like has been destroyed") {
        // refresh();
        await updatePost();
      }
    }
  };

  useEffect(() => {
    if (postData?.like.some((l) => l.userId === data?.id)) {
      setIsLiked(true);
    }
  }, [postData?.like, data?.id]);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const updatePost = async () => {
    console.log("me actualize");
    const post = await fetcher(`/post/${postData?.id}`);
    setPostData(post);
  };

  return (
    <>
      <Card sx={{ width: "100%", maxWidth: "500px" }}>
        <CardHeader
          avatar={
            <Avatar
              src={
                postData?.user.profileImage
                  ? `https://crombiegram-s3.s3.sa-east-1.amazonaws.com/${postData?.user.profileImage}`
                  : ""
              }
              sx={{ width: 30, height: 30 }}
            />
          }
          action={
            <>
              {data?.id === postData?.userId && (
                <IconButton aria-label="settings" onClick={handleOpenUserMenu}>
                  <MoreVertIcon />
                </IconButton>
              )}
            </>
          }
          title={
            <Typography
              sx={{ cursor: "pointer", display: "inline-block" }}
              onClick={() =>
                router.push(
                  data!.id == postData?.userId
                    ? `/profile`
                    : `/contact/${postData?.userId}`
                )
              }
            >
              {postData?.user.firstName + " " + postData?.user.lastName}
            </Typography>
          }
          subheader={
            <SubHeaderPost
              createdAt={postData?.createdAt as Date}
              position={postData?.user.position}
            />
          }
        />

        {postData?.imageName && (
          <Image
            width={500}
            height={500}
            src={
              "https://crombiegram-s3.s3.sa-east-1.amazonaws.com/" +
              postData?.imageName
            }
            alt="foto"
            onClick={handleOpenModal}
          />
        )}
        <CardContent sx={{ pb: 0 }}>
          <Typography
            sx={{ pb: 2 }}
            variant="body2"
            color="text.secondary"
            onClick={handleOpenModal}
          >
            {postData?.contentText}
          </Typography>

          {postData && postData?.like.length > 0 && (
            <Box mt={1} sx={{ display: "flex" }}>
              {postData?.like.length === 1 && (
                <Typography key={postData?.like[0].id} fontSize={14}>
                  {`${postData?.like[0].user.firstName} ${postData?.like[0].user.lastName} likes this post.`}
                </Typography>
              )}
              {postData?.like.length == 2 && (
                <Typography fontSize={14}>
                  {`${postData?.like[0].user.firstName} ${postData?.like[0].user.lastName} and ${postData?.like[1].user.firstName} ${postData?.like[1].user.lastName} like this post.`}
                </Typography>
              )}
              {postData && postData?.like?.length > 2 && (
                <Typography fontSize={14}>
                  {`${postData?.like[0].user.firstName} ${
                    postData?.like[0].user.lastName
                  }, ${postData?.like[1].user.firstName} ${
                    postData?.like[1].user.lastName
                  } and ${postData?.like.length - 2} others.`}
                </Typography>
              )}
            </Box>
          )}
          <CardActions disableSpacing sx={{ p: 0 }}>
            <IconButton aria-label="add to favorites" onClick={handleClickLike}>
              <FavoriteIcon sx={{ color: isLiked ? "#e91e63" : "inherit" }} />
            </IconButton>
            <IconButton aria-label="share">
              <ChatBubbleIcon />
            </IconButton>
          </CardActions>
        </CardContent>

        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <Delete fontSize="small" />
              <Typography textAlign="center">Delete</Typography>
            </ListItemIcon>
          </MenuItem>
        </Menu>

        {postData?.comment &&
          postData?.comment?.length > 0 &&
          postData?.comment.slice(-2).map((c) => {
            return (
              <Box key={c.id}>
                <Divider />
                <ListItem key={c.id} alignItems="flex-start">
                  <ListItemAvatar
                    onClick={() => router.push(`/contact/${c.userId}`)}
                    sx={{ cursor: "pointer" }}
                  >
                    <Avatar
                      alt="profile-avatar"
                      src={
                        c.user.profileImage
                          ? `https://crombiegram-s3.s3.sa-east-1.amazonaws.com/${c.user.profileImage}`
                          : ""
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ margin: 0 }}
                    primary={
                      <>
                        <Typography sx={{ fontSize: 18 }} display="inline">
                          {`${c.user.firstName} ${c.user.lastName}`}&nbsp;&nbsp;
                        </Typography>
                        <Typography
                          sx={{ fontSize: 14, color: "gray" }}
                          display="inline"
                        >
                          {moment(c.createdAt).fromNow()}
                        </Typography>
                      </>
                    }
                    secondary={c.comment}
                  />
                </ListItem>
              </Box>
            );
          })}

        {postData?.comment && postData?.comment?.length > 2 && (
          <Typography
            sx={{
              fontSize: 14,
              cursor: "pointer",
              ml: 2,
              mt: 1,
              color: "#a09e9e",
            }}
            onClick={handleOpenModal}
          >
            Show more comments
          </Typography>
        )}

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
      {open && (
        <ModalPost
          id={postData?.id}
          firstName={postData?.user.firstName}
          lastName={postData?.user.lastName}
          userId={postData?.userId}
          imageName={postData?.imageName}
          profileImage={postData?.user.profileImage}
          position={postData?.user.position}
          contentText={postData?.contentText}
          like={postData?.like}
          createdAt={postData?.createdAt}
          open={open}
          setOpen={setOpen}
          refresh={updatePost}
        />
      )}
    </>
  );
};

export default Post;
