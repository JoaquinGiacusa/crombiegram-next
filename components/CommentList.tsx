import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { fetcher } from "@/utils/fetcher";
import { usePost } from "@/hooks/usePost";
import useUser from "@/hooks/useUser";

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
  const { mutate } = usePost();
  const { data } = useUser();
  const handleDeleteComment = async (commentId: string) => {
    const resDeleteComment = await fetcher(`/comment/${commentId}`, {
      method: "DELETE",
    });
    console.log({ resDeleteComment });
    if (resDeleteComment.message == "comment deleted") {
      mutate();
    }
  };

  return (
    <>
      <List>
        {comments.map((comment) => {
          return (
            <Box key={comment.id}>
              <Divider />
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
                  sx={{ margin: 0 }}
                  primary={
                    <>
                      <Typography sx={{ fontSize: 18 }} display="inline">
                        {`${comment.user.firstName} ${comment.user.lastName}`}
                        {" - "}
                      </Typography>
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
                {data?.user.id === comment.userId && (
                  <IconButton onClick={() => handleDeleteComment(comment.id)}>
                    <DeleteIcon sx={{ fontSize: 18 }}></DeleteIcon>
                  </IconButton>
                )}
              </ListItem>
            </Box>
          );
        })}
      </List>
    </>
  );
};

export default CommentList;
