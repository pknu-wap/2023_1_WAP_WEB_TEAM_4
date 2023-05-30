import React, { useEffect, useState } from "react";
import {
  Stack,
  Button,
  Icon,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PostRegisterApi, PostTestApi } from "../apis/api/common-api";
import { useMutation, useQueryClient } from "react-query";
import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import ImageDescription from "../components/ImageDescription";
import { useSnackBar } from "../hooks/useSnackBar";

const Register = () => {
  const themes = useTheme();
  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-100, 0, 100],
    ["#ff008c", "#7700ff", "rgb(230, 255, 0)"]
  );

  const [message, setMessage] = useState("");
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [1, 1], [2, 2]);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [registerState, setRegisterState] = React.useState({
    email: "",
    password: "",
    passwordCheck: "",
    nickName: "",
  });
  const { email, password, passwordCheck, nickName } = registerState;
  const [, setData] = useState("");
  const isNotSmall = useMediaQuery(themes.breakpoints.up("xs"));
  const { CustomSnackbar, openSnackBar } = useSnackBar();
  CustomSnackbar();
  console.log(openSnackBar);

  const registerHandler = (event) => {
    const { name, value } = event.target;

    setRegisterState({ ...registerState, [name]: value });
  };

  const postRegister = useMutation(PostRegisterApi, {
    onSuccess: () => navigate("/login"),
    onError: (error) => {
      alert(error.response.data);
      // openSnackBar({ message: error.response.data, type: "error" });
    },
  });

  const handleSubmit = async () => {
    const body = {
      blog: {
        blog_name: "chaeyeon",
        introduction: "chaeyeon",
        blog_url: "/chaeyeon",
      },
      loginid: email,
      loginpw: password,
      nickname: nickName,
      url: "/chaeyeon",
      profile_image: "asd",
    };

    console.log(body);

    postRegister.mutate(body);
  };

  return (
    <Stack
      style={{
        minHeight: "100vh",
        height: "1000%",
        backgroundColor: "black",
        padding: "10px",
      }}>
      <Stack height="100%">
        <Stack
          style={{
            width: "100%",
            fontWeight: "bold",
            color: "#ECD8A4",
            fontSize: "30px",
            position: "fixed",
            padding: "10px 0px 10px 20px",
          }}>
          GLOG
        </Stack>
        <Stack flexDirection="row">
          {isNotSmall && (
            <Stack width="100%">
              <ImageDescription />
              <ImageDescription />
            </Stack>
          )}
          <Stack
            style={{
              width: isNotSmall ? "20%" : "80%",
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
                color="#ECD8A4"
                marginBottom="30px">
                Regsiter
              </Stack>
              <input
                placeholder="Email"
                onChange={registerHandler}
                name="email"
                value={email}
                style={{
                  color: "#ffffff",
                  width: "80%",
                  outline: "transparent",
                  backgroundColor: "transparent",
                  border: "transparent",
                  borderBottom: "1px solid #ffffff",
                  marginBottom: "25px",
                }}
              />
              <input
                placeholder="Password"
                type="password"
                onChange={registerHandler}
                name="password"
                value={password}
                style={{
                  color: "#ffffff",
                  marginBottom: "25px",
                  outline: "transparent",
                  width: "80%",
                  backgroundColor: "transparent",
                  border: "transparent",
                  borderBottom:
                    password === passwordCheck
                      ? "1px solid #ffffff"
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
                  color: "#ffffff",
                  marginBottom: password === passwordCheck ? "25px" : "5px",
                  outline: "transparent",
                  width: "80%",
                  backgroundColor: "transparent",
                  border: "transparent",
                  borderBottom:
                    password === passwordCheck
                      ? "1px solid #ffffff"
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
                  color: "#ffffff",
                  marginBottom: "25px",
                  outline: "transparent",
                  width: "80%",
                  backgroundColor: "transparent",
                  border: "transparent",
                  borderBottom: "1px solid #ffffff",
                }}
              />
              <Button
                onClick={handleSubmit}
                variant="outlined"
                sx={{
                  width: "80%",
                  "&.MuiButton-root": {
                    border: "1px solid #ECD8A4",
                    color: "#ECD8A4",
                  },
                }}>
                Register
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Snackbar
        //   anchorOrigin={{ vertical: "top", horizontal: "left" }}
        open={true}
        autoHideDuration={3000}
        // onClose={() => {
        //   closeSnackBar();
        //   if (onClose) onClose();
        // }}
        sx={{ boxShadow: 1, width: "500px", backgroundColor: "red" }}>
        <Alert severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Register;
