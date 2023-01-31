import React from "react";
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
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Delete } from "@mui/icons-material";

export type PostPropsType = {
  id: string;
  firstName: string;
  lastName: string;
  contentText: string;
  imageName?: string;
  profileImage: string;
  createdAt: Date;
  position?: string;
};

const Post: React.FC<PostPropsType> = ({
  id,
  firstName,
  lastName,
  contentText,
  imageName,
  profileImage,
  createdAt,
  position,
}) => {
  // const profileImageSrc = profileImage
  //   ? `https://crombiegram-s3.s3.sa-east-1.amazonaws.com/${profileImage}`
  //   : "";

  const { mutate } = usePost();

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
          <IconButton aria-label="settings" onClick={handleOpenUserMenu}>
            <MoreVertIcon />
          </IconButton>
        }
        title={firstName + " " + lastName}
        subheader={<SubHeaderPost createdAt={createdAt} position={position} />}
      />
      {/* <CardActionArea> */}
      {imageName && (
        <Image
          width={500}
          height={500}
          src={"https://crombiegram-s3.s3.sa-east-1.amazonaws.com/" + imageName}
          alt="foto"
        />
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {contentText}
        </Typography>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
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
      {/* </CardActionArea> */}
    </Card>
  );
};

export default Post;
