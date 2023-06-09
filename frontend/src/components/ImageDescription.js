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
          marginTop="80px"
          marginLeft="100px"
          backgroundColor="background.color"
        />
        <Stack
          width="50%"
          height="60px"
          paddingTop="10em"
          paddingLeft="5em"
          color="background.color"
        >
          나만의 블로그를 만들어보세요!
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
          color="background.color"
        >
          다른 사용자의 게시글도 확인해보아요!
        </Stack>
        <Stack
          width="50%"
          height="330px"
          marginTop="170px"
          marginLeft="100px"
          backgroundColor="background.color"
        />
      </Stack>
    </Fade>
  );
};
