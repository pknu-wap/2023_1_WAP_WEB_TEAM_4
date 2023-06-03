import React from "react";
import { Stack, Button, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.js";
import { useMutation } from "react-query";
import { PostLoginApi } from "../apis/api/common-api.js";
import {
  ImageDescription,
  ImageRightDescription,
} from "../components/ImageDescription.js";
import Layout from "../components/Layout.js";
// import { Cookies } from "react-cookie";

const Login = () => {
  const navigate = useNavigate();
  const themes = useTheme();
  const [loginState, setLoginState] = React.useState({
    email: "",
    password: "",
  });
  const isNotSmall = useMediaQuery(themes.breakpoints.up("xs"));

  const { email, password } = loginState;

  const postRegister = useMutation(PostLoginApi, {
    onSuccess: () => navigate("/"),
    onError: (error) => {
      alert(error.response.data);
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

    postRegister.mutate(body);
  };

  // const login = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await noAuthClient({
  //       method: "post",
  //       url: `${process.env.REACT_APP_LOCAL}/auth`,
  //       data: {
  //         id: id,
  //         pw: password,
  //       },
  //     });
  //     const cookie = new Cookies();
  //     cookie.set("accessToken", res.data.accessToken);
  //     cookie.set("refreshToken", res.data.refreshToken);
  //     const decode = jwt_decode(res.data.accessToken);
  //     // redux에 nickname 저장
  //     dispatch(GET_NAME(decode.nickname));
  //     navigate("/");
  //   } catch (error) {
  //     const err = error.response.data;
  //     console.log(err);
  //     alert("아이디, 비밀번호가 일치하지 않습니다.");
  //   }
  // };

  return (
    <Layout>
      <Stack width="100%" flexDirection="row" bgcolor="black">
        {isNotSmall && (
          <Stack width="100%" paddingRight="200px">
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
            <Stack fontWeight="bold" fontSize="20px" color="#ECD8A4">
              Login
            </Stack>
            <input
              placeholder="Email"
              onChange={loginHandler}
              name="email"
              value={email}
              style={{
                color: "#ffffff",
                width: "80%",
                outline: "transparent",
                backgroundColor: "transparent",
                border: "transparent",
                borderBottom: "1px solid #ffffff",
              }}
            />
            <input
              placeholder="Password"
              onChange={loginHandler}
              type="password"
              name="password"
              value={password}
              style={{
                color: "#ffffff",
                outline: "transparent",
                width: "80%",
                backgroundColor: "transparent",
                border: "transparent",
                borderBottom: "1px solid #ffffff",
              }}
            />
            <Button
              onClick={loginButtonClick}
              variant="outlined"
              size="small"
              sx={{
                width: "80%",
                "&.MuiButton-root": {
                  border: "1px solid #ECD8A4",
                  color: "#ECD8A4",
                },
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

          {/* <Stack
            onClick={() => navigate("/register")}
            color="#ECD8A4"
            fontSize="11px"
            marginTop="10px"
            marginLeft="8%"
            sx={{ ":hover": { color: "#FFC222" }, cursor: "pointer" }}>
            Register
          </Stack> */}
        </Stack>
      </Stack>
    </Layout>
  );
};

export default Login;
