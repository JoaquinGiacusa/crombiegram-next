import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { fetcher } from "@/utils/fetcher";
import { usePost } from "@/hooks/usePost";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import { CommentsProps, usePostComments } from "@/hooks/usePostComments";
import { useState } from "react";

const CommentList = ({
  postId,
  refresh,
}: {
  postId: string;
  refresh: () => void;
}) => {
  const { data } = useUser();
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState(true);
  const [alert, setAlert] = useState(false);
  const {
    data: commentsList,
    mutate,
    size,
    setSize,
    moreToCharge,
  } = usePostComments(postId);

  const router = useRouter();
  const handleDeleteComment = async (commentId: string) => {
    const resDeleteComment = await fetcher(`/comment/${commentId}`, {
      method: "DELETE",
    });
    if (resDeleteComment.message == "comment deleted") {
      setOpenAlert(true);
      setAlert(resDeleteComment.message);
      setSeverity(true);
      console.log("refresh");
      refresh();
      mutate();
    } else {
      setOpenAlert(true);
      setAlert(resDeleteComment.message);
      setSeverity(false);
    }
  };

  return (
    <>
      <List
        sx={{
          overflowY: "auto",
          height: 470,
          "&::-webkit-scrollbar": {
            width: "10px",
          },
          "&::-webkit-scrollbar-track": {
            "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.3)",
          },
          "&::-webkit-scrollbar-thumb": {
            "background-color": "darkgrey",
            outline: "1px solid slategrey",
          },
        }}
      >
        {commentsList &&
          commentsList!.map((comments) => {
            return comments.map((comment) => {
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
                            &nbsp;&nbsp;
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
                      <IconButton
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <DeleteIcon sx={{ fontSize: 18 }}></DeleteIcon>
                      </IconButton>
                    )}

                    <Snackbar
                      sx={{ alignItems: "center", justifyContent: "center" }}
                      open={openAlert}
                      autoHideDuration={2000}
                      onClose={() => setOpenAlert(false)}
                    >
                      <Alert
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        variant="outlined"
                        severity={severity ? "success" : "error"}
                      >
                        {alert}
                      </Alert>
                    </Snackbar>
                  </ListItem>
                </Box>
              );
            });
          })}
      </List>
      {moreToCharge && (
        <Typography
          sx={{
            fontSize: 14,
            cursor: "pointer",
            ml: 2,
            mt: 1,
            color: "#a09e9e",
          }}
          onClick={() => setSize(size + 1)}
        >
          Show more comments
        </Typography>
      )}
    </>
  );
};

export default CommentList;
