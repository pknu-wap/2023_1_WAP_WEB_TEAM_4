import { Icon, Stack } from "@mui/material";
import Fade from "react-reveal/Fade";
import React from "react";

export const ImageDescription = () => {
  return (
    <Fade top>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ width: "80%" }}
      >
        <Stack
          width="50%"
          height="330px"
          marginTop="170px"
          marginLeft="100px"
          backgroundColor="white"
        />
        <Stack
          width="50%"
          height="60px"
          paddingTop="10em"
          paddingLeft="5em"
          color="white"
        >
          가
        </Stack>
      </Stack>
    </Fade>
  );
};

export const ImageRightDescription = () => {
  return (
    <Fade top>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ width: "80%" }}
      >
        <Stack
          width="50%"
          height="60px"
          paddingTop="10em"
          paddingLeft="5em"
          color="white"
        >
          가
        </Stack>
        <Stack
          width="50%"
          height="330px"
          marginTop="170px"
          marginLeft="100px"
          backgroundColor="white"
        />
      </Stack>
    </Fade>
  );
};
