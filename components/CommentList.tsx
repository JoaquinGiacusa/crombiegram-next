import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import { fetcher } from "@/utils/fetcher";
import moment from "moment";

type CommentListProps = {
  comments: {
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

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <>
      <List>
        {comments.map((comment) => {
          return (
            <Box key={comment.id}>
              {/* <Divider /> */}
              <ListItem key={comment.id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="profile-avatar"
                    src={
                      comment.user.profileImage
                        ? `https://crombiegram-s3.s3.sa-east-1.amazonaws.com/${comment.user.profileImage}`
                        : ""
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      {`${comment.user.firstName} ${comment.user.lastName}`}
                      {" - "}
                      <Typography
                        sx={{ fontSize: 14, color: "gray" }}
                        display="inline"
                      >
                        {moment(comment.createdAt).fromNow()}
                      </Typography>
                    </>
                  }
                  secondary={comment.comment}
                />
              </ListItem>
              {/* <Divider variant="inset" component="li" /> */}
            </Box>
          );
        })}
      </List>
    </>
  );
};

export default CommentList;
