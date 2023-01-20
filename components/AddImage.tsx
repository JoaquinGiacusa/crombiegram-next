import Add from "@mui/icons-material/Add";
import { Button, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";

const AddImage = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        color="primary"
        aria-label="edit"
        sx={{
          position: "relative",
          ml: { sm: "90%", xs: "87%" },
          mb: 1,
        }}
        onClick={(e) => setOpen(true)}
      >
        <Add fontSize="small" />
        <Typography>Add Image</Typography>
      </Button>
    </>
  );
};

export default AddImage;
