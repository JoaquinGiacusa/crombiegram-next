import { Box } from "@mui/material";
import React from "react";
import { Typewriter } from "react-simple-typewriter";

function Title() {
  const words = ["Crombiegram."];

  return (
    <Box sx={{ fontFamily: "VT323", fontSize: "4rem", color: "#fc427b" }}>
      <Typewriter
        words={words}
        cursor={true}
        cursorBlinking={true}
        cursorColor={"#fc427b"}
      />
    </Box>
  );
}

export default Title;
