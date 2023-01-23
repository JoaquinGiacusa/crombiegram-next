import Add from "@mui/icons-material/Add";
import {
  Button,
  IconButton,
  Modal,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const AddImage = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>();
  return (
    <>
      <Button color="primary" aria-label="edit" onClick={(e) => setOpen(true)}>
        <Add fontSize="small" />
        <Typography>Add Image</Typography>
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component={"form"}
          sx={{ width: 500 }}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
        ></Box>
      </Modal>
    </>
  );
};

export default AddImage;
