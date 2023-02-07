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
import { usePost } from "@/hooks/usePost";
import { ListItemIcon, Menu, MenuItem, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";
import CommentList from "./CommentList";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/system/Box";
import { useForm } from "react-hook-form";
import useUser from "@/hooks/useUser";

export type PostPropsType = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  contentText: string;
  imageName?: string;
  profileImage: string;
  createdAt: Date;
  position?: string;
  like: {
    id: string;
    postId: string;
    user: { firstName: string; lastName: string; profileImage: string };
    userId: string;
  }[];
  comment: {
    id: string;
    comment: string;
    userId: string;
    postId: string;
    createdAt: Date;
    user: {
      firstName: string;
      lastName: string;
      profileImage?: string;
      position?: string;
    };
  }[];
};

const Post: React.FC<PostPropsType> = ({
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
}) => {
  const { mutate } = usePost();
  const { data } = useUser();
  const [isLiked, setIsLiked] = useState<boolean>();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDelete = async () => {
    const jsonResponse = await fetcher(`/post/${id}`, {
      method: "DELETE",
    });

    if (jsonResponse) {
      mutate();
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
      postId: id,
    };
    reset();
    await fetcher("/comment", {
      method: "POST",
      body: JSON.stringify(body),
      credentials: "include",
    }).then((data) => {
      mutate();
    });
  });

  const handleClickLike = async () => {
    if (!isLiked) {
      const res = await fetcher(`/like/post/${id}`, {
        method: "POST",
        body: JSON.stringify({
          userId: data?.user.id,
        }),
      });

      if (res.like) {
        setIsLiked(true);
        mutate();
      }
    }

    if (isLiked) {
      const res = await fetcher(`/like/post/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
          userId: data?.user.id,
        }),
      });
      if (res.message == "like has been destroyed") {
        setIsLiked(false);
        mutate();
      }
    }
  };

  useEffect(() => {
    if (like.some((l) => l.userId === data?.user.id)) {
      setIsLiked(true);
    }
  }, [like, data?.user.id]);

  return (
    <Card sx={{ width: "100%", maxWidth: "500px" }}>
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
        action={
          <>
            {data?.user.id === userId && (
              <IconButton aria-label="settings" onClick={handleOpenUserMenu}>
                <MoreVertIcon />
              </IconButton>
            )}
          </>
        }
        title={firstName + " " + lastName}
        subheader={<SubHeaderPost createdAt={createdAt} position={position} />}
      />

      {imageName && (
        <Image
          width={500}
          height={500}
          src={"https://crombiegram-s3.s3.sa-east-1.amazonaws.com/" + imageName}
          alt="foto"
        />
      )}
      <CardContent sx={{ pb: 0 }}>
        <Typography variant="body2" color="text.secondary">
          {contentText}
        </Typography>

        {like.length > 0 && (
          <Box mt={1} sx={{ display: "flex" }}>
            {like.length === 1 && (
              <Typography key={like[0].id} fontSize={14}>
                {`${like[0].user.firstName} ${like[0].user.lastName} likes this post.`}
              </Typography>
            )}
            {like.length == 2 && (
              <Typography fontSize={14}>
                {`${like[0].user.firstName} ${like[0].user.lastName} and ${like[1].user.firstName} ${like[1].user.lastName} like this post.`}
              </Typography>
            )}
            {like.length > 2 && (
              <Typography fontSize={14}>
                {`${like[0].user.firstName} ${like[0].user.lastName}, ${
                  like[1].user.firstName
                } ${like[1].user.lastName} and ${like.length - 2} others.`}
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

      {comment && comment?.length > 0 && (
        <CommentList comments={comment}></CommentList>
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
  );
};

export default Post;
