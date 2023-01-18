import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardActionArea from "@mui/material/CardActionArea";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import IconButton from "@mui/material/IconButton";

export type PostPropsType = {
  id: string;
  firstName: string;
  lastName: string;
  contentText: string;
  imageName?: string;
  profileImage: string;
};

const Post: React.FC<PostPropsType> = ({
  id,
  firstName,
  lastName,
  contentText,
  imageName,
  profileImage,
}) => {
  // const profileImageSrc = profileImage
  //   ? `https://crombiegram-s3.s3.sa-east-1.amazonaws.com/${profileImage}`
  //   : "";

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
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={firstName + lastName}
        subheader="Full stack developer"
      />
      {/* <CardActionArea> */}
      {imageName && (
        <CardMedia
          component="img"
          image={
            "https://crombiegram-s3.s3.sa-east-1.amazonaws.com/" + imageName
          }
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
      {/* </CardActionArea> */}
    </Card>
  );
};

export default Post;
