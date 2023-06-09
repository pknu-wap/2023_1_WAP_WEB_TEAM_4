import React, { useEffect, useState } from "react";
import { Stack, Button, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PostRegisterApi } from "../apis/api/common-api";
import { useMutation } from "react-query";
import {
  ImageDescription,
  ImageRightDescription,
} from "../components/ImageDescription";
import A from "../static/pic/A.png";
import B from "../static/pic/B.png";
import C from "../static/pic/C.png";
import D from "../static/pic/D.png";
import Layout from "../components/Layout";
import Snackbar from "../components/Snackbar";
import { themeState } from "../states/common";
import Fade from "react-reveal/Fade";
import { useRecoilState, useRecoilValue } from "recoil";
import { memberIdState } from "../states/loginState";

const Register = () => {
  const themes = useTheme();
  const theme = useRecoilValue(themeState);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [registerState, setRegisterState] = React.useState({
    email: "",
    password: "",
    passwordCheck: "",
    nickName: "",
  });
  const { email, password, passwordCheck, nickName } = registerState;
  const isNotSmall = useMediaQuery(themes.breakpoints.up("md"));
  const [memberId, setMemberId] = useRecoilState(memberIdState);

  const registerHandler = (event) => {
    const { name, value } = event.target;

    setRegisterState({ ...registerState, [name]: value });
  };

  const postRegister = useMutation(PostRegisterApi, {
    onSuccess: () => navigate("/login"),
    onError: (error) => {
      setMessage(error.response.data);
      setOpen(true);
    },
  });

  useEffect(() => {
    memberId && navigate("/");
  }, []);

  const handleSubmit = async () => {
    const body = {
      loginid: email,
      loginpw: password,
      nickname: nickName,
    };

    if (
      email.length !== 0 &&
      isValidEmail &&
      password.length !== 0 &&
      passwordCheck.length !== 0 &&
      nickName.length !== 0 &&
      passwordCheck === password
    ) {
      postRegister.mutate(body);
    } else {
      setMessage("유효하지 않은 값이 존재합니다.");
      setOpen(true);
    }
  };

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return (
    <Layout>
      <Stack
        width="100%"
        flexDirection="row"
        paddingBottom="80px"
        bgcolor={themes.palette.background.main}>
        {isNotSmall && (
          <Stack width="100%" paddingRight="200px">
            <Stack width="100%" paddingRight="200px">
              <Fade top>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  style={{ width: "80%" }}>
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
                    }}>
                    나만의 블로그를 만들어보세요!
                  </Stack>
                </Stack>
              </Fade>
              <Fade top>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  style={{ width: "80%" }}>
                  <Stack
                    style={{
                      width: "50%",
                      height: "60px",
                      paddingTop: "10em",
                      paddingLeft: "5em",
                      color: themes.palette.background.color,
                    }}>
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
                  style={{ width: "80%" }}>
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
                    }}>
                    나만의 블로그를 만들어보세요!
                  </Stack>
                </Stack>
              </Fade>
              <Fade top>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  style={{ width: "80%" }}>
                  <Stack
                    style={{
                      width: "50%",
                      height: "60px",
                      paddingTop: "10em",
                      paddingLeft: "5em",
                      color: themes.palette.background.color,
                    }}>
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
          <Stack width="80%" style={{ alignItems: "center" }}>
            <Stack
              fontWeight="bold"
              fontSize="20px"
              color="primary.main"
              marginBottom="30px">
              Regsiter
            </Stack>
            <input
              placeholder="Email"
              onChange={registerHandler}
              name="email"
              value={email}
              style={{
                color: themes.palette.background.color,
                width: "80%",
                outline: "transparent",
                backgroundColor: "transparent",
                border: "transparent",
                borderBottom:
                  registerState.email.length === 0 || isValidEmail
                    ? theme === "DARK"
                      ? "1px solid #ffffff"
                      : `1px solid ${themes.palette.primary.main}`
                    : "1px solid red",
                marginBottom:
                  registerState.email.length === 0 || isValidEmail
                    ? "25px"
                    : "5px",
              }}
            />
            {!(registerState.email.length === 0 || isValidEmail) && (
              <Stack
                fontWeight="bold"
                marginBottom="25px"
                fontSize="6px"
                color="red">
                이메일 형식에 맞지 않습니다.
              </Stack>
            )}
            <input
              placeholder="Password"
              type="password"
              onChange={registerHandler}
              name="password"
              value={password}
              style={{
                color: themes.palette.background.color,
                marginBottom: "25px",
                outline: "transparent",
                width: "80%",
                backgroundColor: "transparent",
                border: "transparent",
                borderBottom:
                  password === passwordCheck
                    ? theme === "DARK"
                      ? "1px solid #ffffff"
                      : `1px solid ${themes.palette.primary.main}`
                    : "1px solid red",
              }}
            />
            <input
              placeholder="Password Check"
              type="password"
              onChange={registerHandler}
              name="passwordCheck"
              value={passwordCheck}
              style={{
                color: themes.palette.background.color,
                marginBottom: password === passwordCheck ? "25px" : "5px",
                outline: "transparent",
                width: "80%",
                backgroundColor: "transparent",
                border: "transparent",
                borderBottom:
                  password === passwordCheck
                    ? theme === "DARK"
                      ? "1px solid #ffffff"
                      : `1px solid ${themes.palette.primary.main}`
                    : "1px solid red",
              }}
            />
            {password !== passwordCheck && (
              <Stack
                fontWeight="bold"
                marginBottom="25px"
                fontSize="6px"
                color="red">
                비밀번호와 비밀번호 확인이 일치하지 않습니다.
              </Stack>
            )}
            <input
              placeholder="Nickname"
              onChange={registerHandler}
              name="nickName"
              value={nickName}
              style={{
                color: themes.palette.background.color,
                marginBottom: "25px",
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
              onClick={handleSubmit}
              variant="outlined"
              sx={{
                width: "80%",
              }}>
              Register
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

export default Register;
