import React, { useState } from "react";
import { fetcher } from "@/utils/fetcher";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";

type ConfirmDeletePostType = {
  id: string;
  refresh: () => void;
  openDelete: boolean;
  setOpenDelete: any;
};

const ConfirmDeletePost: React.FC<ConfirmDeletePostType> = ({
  id,
  refresh,
  openDelete,
  setOpenDelete,
}) => {
  const handleDelete = async () => {
    const jsonResponse = await fetcher(`/post/${id}`, {
      method: "DELETE",
    });
    if (jsonResponse) {
      refresh();
    }
  };
  return (
    <Modal
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={openDelete}
      onClose={(e) => {
        setOpenDelete(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          height: 200,
          width: 400,
          backgroundColor: "#a5b1c2",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack>
          <Typography
            sx={{
              alignContent: "center",
              color: "primary",
            }}
          >
            Are you sure to delete this post?
          </Typography>
          <Stack direction="row">
            <Button onClick={handleDelete} variant="outlined">
              Yes
            </Button>
            <Button
              onClick={(e) => {
                setOpenDelete(false);
              }}
              variant="outlined"
              color="secondary"
            >
              No
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ConfirmDeletePost;
