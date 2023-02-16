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
import { useRouter } from "next/router";
import { CommentsProps } from "@/hooks/usePostComments";

type CommentListProps = { comments: CommentsProps[] };

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const { mutate } = usePost();
  const { data } = useUser();

  const router = useRouter();
  const handleDeleteComment = async (commentId: string) => {
    const resDeleteComment = await fetcher(`/comment/${commentId}`, {
      method: "DELETE",
    });
    if (resDeleteComment.message == "comment deleted") {
      mutate();
    }
  };

  return (
    <>
      <List>
        {comments.flat().map((comment) => {
          console.log("SFSRVSRFSRSFRSRFRSFRSS", comment);
          return (
            <Box key={comment.id}>
              <Divider />
              <ListItem key={comment.id} alignItems="flex-start">
                <ListItemAvatar
                  onClick={() => router.push(`/contact/${comment.userId}`)}
                  sx={{ cursor: "pointer" }}
                >
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
                {data?.id === comment.userId && (
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
