import { Button, IconButton, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import ChangePassword from "../components/mypage/ChangePassword";
import Post from "../components/mypage/Post";
import Skin from "../components/mypage/Skin";
import Blog from "../components/mypage/Blog";
import Pororo from "../static/pic/Pororo.jpg";
import Layout from "../components/Layout";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
function Mypage() {
  const theme = useTheme();
  const [option, setOption] = useState(0);
  const [description, setDescription] = useState(false);
  const optionArray = {
    0: <ChangePassword />,
    1: <Post />,
    2: <Skin />,
    3: <Blog />,
  };

  return (
    <Layout>
      <Stack
        width="100%"
        height="100%"
        marginTop="40px"
        justifyContent="center"
        alignItems="center"
        backgroundColor="background.main">
        <Stack
          width="fit-content"
          height="100%"
          bgcolor="background.contractColor"
          border={`1px solid ${theme.palette.primary.main}`}
          alignItems="flex-start"
          justifyContent="center"
          borderRadius="12px"
          p="20px 40px">
          <Stack
            borderRadius="10px"
            width="100%"
            gap="24px"
            alignItems="center"
            bgcolor="background.contractColor"
            direction="row"
            marginBottom="32px">
            <img
              style={{ width: "20%", height: "70%", borderRadius: "50%" }}
              src={Pororo}
              alt="User_Picture"
            />

            <Stack gap="28px">
              <Stack
                color={theme.palette.background.color}
                width="fit-content"
                fontSize="24px">
                Chae yeon
              </Stack>
              {description ? (
                <Stack direction="row" alignItems="center">
                  <Stack
                    width="fit-content"
                    color={theme.palette.background.color}>
                    한 줄 소개를 작성하세요
                  </Stack>
                  <IconButton onClick={() => setDescription(false)}>
                    <ModeEditOutlineIcon />
                  </IconButton>
                </Stack>
              ) : (
                <Stack direction="row">
                  <TextField size="small" />
                  <Button onClick={() => setDescription(true)}>저장</Button>
                </Stack>
              )}
            </Stack>
          </Stack>
          <Stack direction="row" width="100%" marginBottom="32px">
            <Stack
              minWidth="fit-content"
              width="25%"
              p="0px 2%"
              borderRadius="10px"
              alignItems="center"
              justifyContent="center"
              color={
                option === 0
                  ? theme.palette.background.main
                  : theme.palette.background.color
              }
              bgcolor={option === 0 ? theme.palette.primary[400] : undefined}
              sx={{ cursor: "pointer" }}
              onClick={() => setOption(0)}>
              계정 설정
            </Stack>
            <Stack
              minWidth="fit-content"
              width="25%"
              p="0px 2%"
              borderRadius="10px"
              alignItems="center"
              justifyContent="center"
              onClick={() => setOption(3)}
              sx={{ cursor: "pointer" }}
              color={
                option === 3
                  ? theme.palette.background.main
                  : theme.palette.background.color
              }
              bgcolor={option === 3 ? theme.palette.primary[400] : undefined}>
              블로그 설정
            </Stack>
            <Stack
              minWidth="fit-content"
              width="25%"
              p="0px 2%"
              borderRadius="10px"
              alignItems="center"
              justifyContent="center"
              sx={{ cursor: "pointer" }}
              onClick={() => setOption(1)}
              color={
                option === 1
                  ? theme.palette.background.main
                  : theme.palette.background.color
              }
              bgcolor={option === 1 ? theme.palette.primary[400] : undefined}>
              방명록 설정
            </Stack>
            <Stack
              minWidth="fit-content"
              width="25%"
              p="1% 2%"
              borderRadius="10px"
              alignItems="center"
              sx={{ cursor: "pointer" }}
              justifyContent="center"
              onClick={() => setOption(2)}
              color={
                option === 2
                  ? theme.palette.background.main
                  : theme.palette.background.color
              }
              bgcolor={option === 2 ? theme.palette.primary[400] : undefined}>
              스킨
            </Stack>
          </Stack>
          {optionArray[option]}
        </Stack>
      </Stack>
    </Layout>
  );
}

export default Mypage;
