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
        <Stack fontWeight="bold" fontSize="18px" color="black" height="35px">
          알고리즘
        </Stack>
        <Stack fontSize="16px" color="#89B687" paddingLeft="10px" height="30px">
          - 알고리즘이 신기한 이유?
        </Stack>
        <Stack fontSize="16px" color="black" paddingLeft="10px" height="30px">
          - 알고리즘이 안신기해지려면?
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Anchor;
