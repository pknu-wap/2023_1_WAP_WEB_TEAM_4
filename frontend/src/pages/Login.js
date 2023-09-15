import React, { useEffect, useState } from "react";
import { Stack, Button, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { PostLoginApi } from "../apis/api/common-api.js";
import {
  ImageDescription,
  ImageRightDescription,
} from "../components/ImageDescription.js";
import Layout from "../components/Layout.js";
import A from "../static/pic/A.png";
import B from "../static/pic/B.png";
import C from "../static/pic/C.png";
import D from "../static/pic/D.png";
import {
  blogUrlState,
  memberIdState,
  nicknameState,
  profileImageState,
} from "../states/loginState.js";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Snackbar from "../components/Snackbar.js";
import { themeState, visitIdState } from "../states/common.js";
import Fade from "react-reveal/Fade";
import { defaultInstance } from "../apis/index.js";

export const API_BASE_URL = defaultInstance;

//서버에서 인증을 완료한 후에 프론트엔드로 돌아올 redirect uri (app.oauth2.authorized-redirect-uri와 일치해야 한다)
export const OAUTH2_REDIRECT_URI =
  "http://chaeyeonblog.s3-website-us-east-1.amazonaws.com/register";

export const GOOGLE_AUTH_URL =
  API_BASE_URL +
  "/oauth2/authorization/google?redirect_uri=" +
  OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL =
  API_BASE_URL +
  "/oauth2/authorization/facebook?redirect_uri=" +
  OAUTH2_REDIRECT_URI;
export const NAVER_AUTH_URL =
  API_BASE_URL +
  "/oauth2/authorization/naver?redirect_uri=" +
  OAUTH2_REDIRECT_URI;
export const KAKAO_AUTH_URL =
  API_BASE_URL +
  "/oauth2/authorization/kakao?redirect_uri=" +
  OAUTH2_REDIRECT_URI;

const Login = () => {
  const theme = useRecoilValue(themeState);
  const [visitId, setVisitId] = useRecoilState(visitIdState);

  const navigate = useNavigate();
  const themes = useTheme();
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });
  const isNotSmall = useMediaQuery(themes.breakpoints.up("md"));
  const [open, setOpen] = useState(false);
  const [memberId, setMemberId] = useRecoilState(memberIdState);
  const setNickname = useSetRecoilState(nicknameState);
  const setProfileImage = useSetRecoilState(profileImageState);
  const setBlogUrl = useSetRecoilState(blogUrlState);
  const [message, setMessage] = useState("");

  const { email, password } = loginState;

  useEffect(() => {
    memberId && navigate("/");
  }, []);

  const postRegister = useMutation(PostLoginApi, {
    onSuccess: (data) => {
      setMemberId(data.data.memberId);
      setBlogUrl(data.data.blogUrl);
      setNickname(data.data.nickname);
      setProfileImage(data.data.profileImage);

      navigate("/");
    },
    onError: (error) => {
      setMessage(error.response.data);
      setOpen(true);
    },
  });

  const loginHandler = (event) => {
    const { name, value } = event.target;
    setLoginState({ ...loginState, [name]: value });
  };

  const loginButtonClick = () => {
    const body = {
      loginId: email,
      loginPw: password,
    };

    if (email.length !== 0 && password !== 0) {
      setVisitId(0);
      postRegister.mutate(body);
    } else {
      setMessage("이메일과 비밀번호는 필수 값입니다.");
      setOpen(true);
      setVisitId(0);
    }
  };

  return (
    <Layout>
      {!memberId && (
        <Stack
          width="100%"
          flexDirection="row"
          paddingBottom="80px"
          bgcolor="background.contractColor"
        >
          {isNotSmall && (
            <Stack width="100%" paddingRight="200px">
              <Fade top>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  style={{ width: "80%" }}
                >
                  <img
                    src={A}
                    alt="j"
                    style={{
                      width: "50%",
                      height: "330px",
                      marginTop: "80px",
                      marginLeft: "100px",
                    }}
                    backgroundColor={themes.palette.background.color}
                  />
                  <Stack
                    style={{
                      width: "50%",
                      height: "60px",
                      paddingTop: "10em",
                      paddingLeft: "5em",
                      color: themes.palette.background.color,
                    }}
                  >
                    나만의 블로그를 만들어보세요!
                  </Stack>
                </Stack>
              </Fade>
              <Fade top>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  style={{ width: "80%" }}
                >
                  <Stack
                    style={{
                      width: "50%",
                      height: "60px",
                      paddingTop: "10em",
                      paddingLeft: "5em",
                      color: themes.palette.background.color,
                    }}
                  >
                    나만의 블로그를 만들어보세요!
                  </Stack>
                  <img
                    src={B}
                    alt="j"
                    style={{
                      width: "50%",
                      height: "330px",
                      marginTop: "80px",
                      marginLeft: "100px",
                    }}
                    backgroundColor={themes.palette.background.color}
                  />
                </Stack>
              </Fade>
              <Fade top>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  style={{ width: "80%" }}
                >
                  <img
                    src={C}
                    alt="j"
                    style={{
                      width: "50%",
                      height: "330px",
                      marginTop: "80px",
                      marginLeft: "100px",
                    }}
                    backgroundColor={themes.palette.background.color}
                  />
                  <Stack
                    style={{
                      width: "50%",
                      height: "60px",
                      paddingTop: "10em",
                      paddingLeft: "5em",
                      color: themes.palette.background.color,
                    }}
                  >
                    나만의 블로그를 만들어보세요!
                  </Stack>
                </Stack>
              </Fade>
              <Fade top>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  style={{ width: "80%" }}
                >
                  <Stack
                    style={{
                      width: "50%",
                      height: "60px",
                      paddingTop: "10em",
                      paddingLeft: "5em",
                      color: themes.palette.background.color,
                    }}
                  >
                    나만의 블로그를 만들어보세요!
                  </Stack>
                  <img
                    src={D}
                    alt="j"
                    style={{
                      width: "50%",
                      height: "330px",
                      marginTop: "80px",
                      marginLeft: "100px",
                    }}
                    backgroundColor={themes.palette.background.color}
                  />
                </Stack>
              </Fade>
            </Stack>
          )}
          <Stack
            style={{
              width: isNotSmall ? "20%" : "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "fixed",
              right: 0,
              top: 0,
            }}
          >
            <Stack width="80%" gap="30px" style={{ alignItems: "center" }}>
              <Stack fontWeight="bold" fontSize="20px" color="primary.main">
                Login
              </Stack>
              <input
                placeholder="Email"
                onChange={loginHandler}
                name="email"
                value={email}
                style={{
                  color: themes.palette.background.color,
                  width: "80%",
                  outline: "transparent",
                  backgroundColor: "transparent",
                  border: "transparent",
                  borderBottom:
                    theme === "DARK"
                      ? "1px solid #ffffff"
                      : `1px solid ${themes.palette.primary.main}`,
                }}
              />
              <input
                placeholder="Password"
                onChange={loginHandler}
                type="password"
                name="password"
                value={password}
                style={{
                  color: themes.palette.background.color,
                  outline: "transparent",
                  width: "80%",
                  backgroundColor: "transparent",
                  border: "transparent",
                  borderBottom:
                    theme === "DARK"
                      ? "1px solid #ffffff"
                      : `1px solid ${themes.palette.primary.main}`,
                }}
              />
              <Button
                onClick={loginButtonClick}
                variant="outlined"
                size="small"
                sx={{
                  width: "80%",
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/register")}
                variant="contained"
                size="small"
                sx={{
                  width: "80%",
                  marginTop: "-20px",
                }}
              >
                Sign Up
              </Button>
              <Stack direction={"row"} spacing={3}>
                <a href={GOOGLE_AUTH_URL}>구글</a>
                <a href={KAKAO_AUTH_URL}>카카오</a>
                <a href={NAVER_AUTH_URL}>네이버</a>
              </Stack>
            </Stack>

            <Snackbar
              open={open}
              setOpen={setOpen}
              title={message}
              color="error"
            />
          </Stack>
        </Stack>
      )}
    </Layout>
  );
};

export default Login;
