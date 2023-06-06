import React, { useState } from "react";
import { Stack, Button, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { PostLoginApi } from "../apis/api/common-api.js";
import {
  ImageDescription,
  ImageRightDescription,
} from "../components/ImageDescription.js";
import Layout from "../components/Layout.js";
import {
  blogUrlState,
  memberIdState,
  nicknameState,
  profileImageState,
} from "../states/loginState.js";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Snackbar from "../components/Snackbar.js";
import { themeState } from "../states/common.js";

const Login = () => {
  const theme = useRecoilValue(themeState);

  const navigate = useNavigate();
  const themes = useTheme();
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });
  const isNotSmall = useMediaQuery(themes.breakpoints.up("md"));
  const [open, setOpen] = useState(false);
  const setMemberId = useSetRecoilState(memberIdState);
  const setNickname = useSetRecoilState(nicknameState);
  const setProfileImage = useSetRecoilState(profileImageState);
  const setBlogUrl = useSetRecoilState(blogUrlState);
  const [message, setMessage] = useState("");

  const { email, password } = loginState;

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
      postRegister.mutate(body);
    } else {
      setMessage("이메일과 비밀번호는 필수 값입니다.");
      setOpen(true);
    }
  };

  return (
    <Layout>
      <Stack
        width="100%"
        flexDirection="row"
        bgcolor="background.contractColor">
        {isNotSmall && (
          <Stack width="100%" paddingRight="200px">
            <ImageDescription />
            <ImageRightDescription />
            <ImageDescription />
            <ImageRightDescription />
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
          }}>
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
                color: "background.color",
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
                color: "background.color",
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
              }}>
              Login
            </Button>
            <Button
              onClick={() => navigate("/register")}
              variant="contained"
              size="small"
              sx={{
                width: "80%",
                marginTop: "-20px",
              }}>
              Sign Up
            </Button>
          </Stack>
          <Snackbar
            open={open}
            setOpen={setOpen}
            title={message}
            color="error"
          />
        </Stack>
      </Stack>
    </Layout>
  );
};

export default Login;
