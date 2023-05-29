import { Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Header from "../components/HeaderMobile";
import { useTheme } from "@mui/material/styles";
import SideButton from "../components/SideButton";
import ChangePassword from "../components/mypage/ChangePassword";
import Post from "../components/mypage/Post";
import Skin from "../components/mypage/Skin";
import Blog from "../components/mypage/Blog";

function Mypage() {
  const theme = useTheme();
  const [option, setOption] = useState(0);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const optionArray = {
    0: <ChangePassword />,
    1: <Post />,
    2: <Skin />,
    3: <Blog />,
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="100%"
      minHeight="100vh"
      backgroundColor="background.main">
      <Header />

      <Stack
        direction="row"
        height="100%"
        width="50%"
        marginTop="80px"
        justifyContent="center"
        // flexWrap="wrap"
        // bgcolor="background.contractColor"
        p="4%"
        // gap="44px"
      >
        <Stack
          borderRadius="10px"
          border={`1px solid ${theme.palette.primary.main}`}
          p="4%"
          width="100%"
          maxWidth="200px"
          gap="24px"
          alignItems="center"
          // borderRight="0px solid black"
          bgcolor="background.contractColor"
          // gap="24px"
          height="100%">
          <Typography variant="h6" color="primary.main" fontWeight={700}>
            CHAEYEON's BLOG
          </Typography>
          <Stack
            width="80%"
            height="160px"
            bgcolor="primary.main"
            borderRadius="50%"
          />
          <Stack fontSize="24px">Chae yeon</Stack>
          <Stack>한줄 소개를 작성하세요</Stack>
        </Stack>
        <Stack
          // border={`1px solid ${theme.palette.primary.main}`}
          //   justifyContent="center"
          width="100%"
          //   maxWidth="900px"
          bgcolor="background.contractColor"
          border={`1px solid ${theme.palette.primary.main}`}
          alignItems="flex-start"
          justifyContent="center"
          borderRadius="0px 10px 10px 0px"
          borderLeft="0px solid black"
          gap="24px"
          direction="row">
          <Stack width="100%" p="32px" gap="32px">
            <Stack direction="row" width="100%">
              <Stack
                width="fit-content"
                p="2% 5%"
                borderRadius="10px"
                alignContent="center"
                justifyContent="center"
                color="white"
                bgcolor={theme.palette.primary[400]}
                sx={{ cursor: "pointer" }}
                onClick={() => setOption(0)}>
                계정 설정
              </Stack>
              <Stack
                width="fit-content"
                padding="2% 5%"
                borderRadius="10px"
                alignContent="center"
                justifyContent="center"
                onClick={() => setOption(3)}
                sx={{ cursor: "pointer" }}
                // color="white"
                // bgcolor={theme.palette.primary[400]}
              >
                블로그 설정
              </Stack>
              <Stack
                width="fit-content"
                padding="2% 5%"
                borderRadius="10px"
                alignContent="center"
                justifyContent="center"
                sx={{ cursor: "pointer" }}
                onClick={() => setOption(1)}
                // color="white"
                // bgcolor={theme.palette.primary[400]}
              >
                방명록 설정
              </Stack>
              <Stack
                width="fit-content"
                padding="2% 5%"
                borderRadius="10px"
                alignContent="center"
                sx={{ cursor: "pointer" }}
                justifyContent="center"
                onClick={() => setOption(2)}
                // color="white"
                // bgcolor={theme.palette.primary[400]}
              >
                스킨
              </Stack>
            </Stack>
            {optionArray[option]}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Mypage;
