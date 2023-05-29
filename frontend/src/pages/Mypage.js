import { Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Header from "../components/HeaderMobile";
import { useTheme } from "@mui/material/styles";
import SideButton from "../components/SideButton";
import ChangePassword from "../components/mypage/ChangePassword";
import Post from "../components/mypage/Post";
import Skin from "../components/mypage/Skin";
import Blog from "../components/mypage/Blog";
import Pororo from "../static/pic/Pororo.jpg";

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
        marginTop="80px"
        width="fit-content"
        bgcolor="background.contractColor"
        border={`1px solid ${theme.palette.primary.main}`}
        alignItems="flex-start"
        justifyContent="center"
        borderRadius="12px"
        p="80px 64px"
        gap="52px">
        <Stack
          borderRadius="10px"
          width="100%"
          gap="24px"
          alignItems="center"
          bgcolor="background.contractColor"
          direction="row"
          height="100%">
          <img
            style={{ width: "20%", height: "20%", borderRadius: "50%" }}
            src={Pororo}
            alt="User_Picture"
          />

          <Stack width="100%" gap="32px">
            <Stack fontSize="24px">Chae yeon</Stack>
            <Stack>한줄 소개를 작성하세요</Stack>
          </Stack>
        </Stack>
        <Stack direction="row" width="100%">
          <Stack
            width="fit-content"
            p="2% 5%"
            borderRadius="10px"
            alignContent="center"
            justifyContent="center"
            color={option === 0 ? "white" : "black"}
            bgcolor={option === 0 ? theme.palette.primary[400] : undefined}
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
            color={option === 3 ? "white" : "black"}
            bgcolor={option === 3 ? theme.palette.primary[400] : undefined}>
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
            color={option === 1 ? "white" : "black"}
            bgcolor={option === 1 ? theme.palette.primary[400] : undefined}>
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
            color={option === 2 ? "white" : "black"}
            bgcolor={option === 2 ? theme.palette.primary[400] : undefined}>
            스킨
          </Stack>
        </Stack>
        {optionArray[option]}
      </Stack>
    </Stack>
  );
}

export default Mypage;
