import { Stack } from "@mui/material";
import React from "react";

function Anchor() {
  return (
    <Stack
      paddingTop="30px"
      justifyContent="center"
      style={{
        height: "100%",
        position: "fixed",
        top: 0,
        right: 100,
      }}>
      <Stack>
        <Stack
          fontWeight="bold"
          fontSize="18px"
          color="background.color"
          height="35px"
          sx={{ cursor: "pointer" }}>
          알고리즘
        </Stack>
        <Stack
          fontSize="16px"
          color="pointColor.main"
          paddingLeft="10px"
          height="30px"
          sx={{ cursor: "pointer" }}>
          - 알고리즘이 신기한 이유?
        </Stack>
        <Stack
          fontSize="16px"
          color="background.color"
          paddingLeft="10px"
          height="30px"
          sx={{ cursor: "pointer" }}>
          - 알고리즘이 안신기해지려면?
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Anchor;
