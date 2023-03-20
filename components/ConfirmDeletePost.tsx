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
      console.log("me eliminaron");
      refresh();
    }
  };
  return (
    <Modal
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
          height: 150,
          width: 425,
          backgroundColor: "background.paper",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 2,
        }}
      >
        <Stack gap={2}>
          <Typography
            sx={{
              color: "primary",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Are you sure to delete this post?
          </Typography>
          <Stack direction="row" gap={2}>
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
