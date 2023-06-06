import { Button, IconButton, Stack, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import ChangePassword from "../components/mypage/ChangePassword";
import Post from "../components/mypage/Post";
import Skin from "../components/mypage/Skin";
import Blog from "../components/mypage/Blog";
import Pororo from "../static/pic/Pororo.jpg";
import Layout from "../components/Layout";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useGetMypageQuery } from "../apis/api/mypage-api";
import AddIcon from "@mui/icons-material/Add";
import { useRecoilState } from "recoil";
import { memberIdState } from "../states/loginState";
import { Navigate, useNavigate } from "react-router-dom";

const Mypage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [option, setOption] = useState(0);
  const [profileImage, setProfileImage] = useState(null);
  const [memberId, setMemeberId] = useRecoilState(memberIdState);
  const [blogName, setBlogName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [nickname, setNickname] = useState("");
  const [skin, setSkin] = useState(0);
  const [description, setDescription] = useState(false);
  const optionArray = {
    0: (
      <ChangePassword
        id={blogName}
        nickname={nickname}
        setNickname={setNickname}
        memberId={memberId}
      />
    ),
    2: <Skin />,
    3: (
      <Blog
        blogName={blogName}
        setBlogName={setBlogName}
        introduction={introduction}
        setIntroduction={setIntroduction}
        memberId={memberId}
      />
    ),
  };

  const { data } = useGetMypageQuery({ loginedMemberId: memberId });

  useEffect(() => {
    !data && navigate("/login");
    setBlogName(data?.blogName);
    setIntroduction(data?.introduction);
    setNickname(data?.nickname);
    setProfileImage(data?.profileImage);
    setSkin(data?.skin);
  }, [data]);

  const fileInput = useRef(null);

  const handleButtonClick = (event) => {
    fileInput.current?.click();
  };

  const onUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        setProfileImage(reader.result || null);
        resolve();
      };
    });
  };

  return (
    <Layout>
      {data && (
        <Stack
          width="100%"
          marginTop="40px"
          justifyContent="center"
          alignItems="center"
          backgroundColor="background.main">
          <Stack
            bgcolor="background.contractColor"
            border={`1px solid ${theme.palette.primary.main}`}
            alignItems="flex-start"
            justifyContent="center"
            borderRadius="12px"
            p="20px 40px">
            <Stack
              borderRadius="10px"
              gap="24px"
              alignItems="center"
              bgcolor="background.contractColor"
              direction="row"
              marginBottom="32px">
              <Stack width="20%" gap="12px">
                {!profileImage ? (
                  <Stack bgcolor="primary.200" width="100%" height="70%">
                    <IconButton onClick={handleButtonClick}>
                      <AddIcon />
                      <input
                        style={{ display: "none" }}
                        type="file"
                        ref={fileInput}
                        onChange={onUpload}
                      />
                    </IconButton>
                  </Stack>
                ) : (
                  <img
                    style={{ height: "70%", borderRadius: "50%" }}
                    src={Pororo}
                    alt="User_Picture"
                  />
                )}
                <Button variant="outlined">삭제</Button>
              </Stack>
              <Stack gap="28px">
                <Stack
                  color={theme.palette.background.color}
                  width="fit-content"
                  fontSize="24px">
                  {data?.nickname}
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
      )}
    </Layout>
  );
};

export default Mypage;
