import {
  Button,
  IconButton,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import ChangePassword from "../components/mypage/ChangePassword";
import Post from "../components/mypage/Post";
import Skin from "../components/mypage/Skin";
import Blog from "../components/mypage/Blog";
import Pororo from "../static/pic/Pororo.jpg";
import Layout from "../components/Layout";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import {
  PostChangeProfileApi,
  useGetMypageQuery,
} from "../apis/api/mypage-api";
import AddIcon from "@mui/icons-material/Add";
import { useRecoilState } from "recoil";
import { memberIdState } from "../states/loginState";
import { Navigate, useNavigate } from "react-router-dom";
import Flip from "react-reveal/Flip";
import { useMutation, useQueryClient } from "react-query";

const Mypage = () => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const [option, setOption] = useState(0);
  const [profileImage, setProfileImage] = useState(null);
  const [memberId, setMemeberId] = useRecoilState(memberIdState);
  const [blogName, setBlogName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [nickname, setNickname] = useState("");
  const [skin, setSkin] = useState(0);
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
    !memberId && navigate("/login");
    setBlogName(data?.blogName);
    setIntroduction(data?.introduction);
    setNickname(data?.nickname);
    setProfileImage(data?.profileImage);
    setSkin(data?.skin);
  }, [data]);

  const postChangeProfileQuery = useMutation(PostChangeProfileApi, {
    onSuccess: () => queryClient.invalidateQueries("Mypage"),
    onError: (error) => {
      alert(error.response.data);
    },
  });

  const fileInput = useRef(null);

  const handleButtonClick = (event) => {
    fileInput.current?.click();
  };

  const onUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    await new Promise((resolve) => {
      reader.onload = () => {
        setProfileImage(reader.result || null);
        resolve();
      };
    });
    const formData = new FormData();
    formData.append("loginedMemberId", memberId);
    formData.append("profile", file);

    postChangeProfileQuery.mutate(formData);
  };

  return (
    <Layout>
      {data && (
        <Stack
          width="100%"
          marginTop="40px"
          justifyContent="center"
          alignItems="center"
          backgroundColor="background.main"
        >
          <Flip left>
            <Stack
              width="fit-content"
              bgcolor="background.contractColor"
              border={`1px solid ${theme.palette.primary.main}`}
              alignItems="flex-start"
              justifyContent="center"
              borderRadius="12px"
              p="20px 40px"
            >
              <Stack
                borderRadius="10px"
                gap="24px"
                width="200px"
                alignItems="center"
                bgcolor="background.contractColor"
                direction="row"
                marginBottom="32px"
              >
                <Stack width="100px" gap="12px">
                  {!profileImage ? (
                    <IconButton
                      onClick={handleButtonClick}
                      style={{
                        height: "100px",
                        width: "100px",
                        borderRadius: "50%",
                      }}
                    >
                      <AddIcon />
                      <input
                        style={{ display: "none" }}
                        type="file"
                        ref={fileInput}
                        onChange={onUpload}
                      />
                    </IconButton>
                  ) : (
                    <img
                      style={{
                        height: "100px",
                        width: "100px",
                        borderRadius: "50%",
                      }}
                      src={profileImage}
                      alt="User_Picture"
                    />
                  )}
                  <Button
                    variant="outlined"
                    onClick={() => setProfileImage(null)}
                  >
                    삭제
                  </Button>
                </Stack>
                <Stack gap="28px" width="300px">
                  <Stack
                    color={theme.palette.background.color}
                    width="fit-content"
                    fontSize="24px"
                  >
                    {data?.nickname}
                  </Stack>
                  <Stack direction="row" alignItems="center">
                    <Stack
                      width={!isPhone ? "500px" : "100px"}
                      height="100px"
                      sx={{ overflow: "scroll" }}
                      color={theme.palette.background.color}
                    >
                      {data?.introduction}
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
              <Stack
                direction="row"
                width={!isPhone ? "500px" : "300px"}
                marginBottom="32px"
              >
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
                  bgcolor={
                    option === 0 ? theme.palette.primary[400] : undefined
                  }
                  sx={{ cursor: "pointer" }}
                  onClick={() => setOption(0)}
                >
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
                  bgcolor={
                    option === 3 ? theme.palette.primary[400] : undefined
                  }
                >
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
                  bgcolor={
                    option === 2 ? theme.palette.primary[400] : undefined
                  }
                >
                  스킨
                </Stack>
              </Stack>
              {optionArray[option]}
            </Stack>
          </Flip>
        </Stack>
      )}
    </Layout>
  );
};

export default Mypage;
