import React, { useState } from "react";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [registerState, setRegisterState] = React.useState({
    email: "",
    password: "",
    passwordCheck: "",
    nickName: "",
  });
  const { email, password, passwordCheck, nickName } = registerState;
  const [, setData] = useState("");

  const registerHandler = (event) => {
    const { name, value } = event.target;

    setRegisterState({ ...registerState, [name]: value });
  };

  const handleSubmit = async () => {
    const body = {
      login_id: registerState.email,
      login_pw: registerState.password,
      nickname: registerState.nickName,
    };

    try {
      const response = await axios.post(
        "http://test-env.eba-babq7paf.us-east-1.elasticbeanstalk.com/user/register",
        body
      );
      navigate("/login");
      setData(response.data.id);
    } catch (e) {
      alert(e.response);
      console.log(e);
    }
  };
  return (
    <Stack style={{ backgroundColor: "black" }}>
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
        <Stack style={{ width: "80%" }}>
          <Stack flexDirection="row" alignItems="center">
            <Stack
              width="600px"
              height="330px"
              marginTop="170px"
              marginLeft="100px"
              backgroundColor="white"></Stack>
            <Stack
              width="350px"
              height="60px"
              marginTop="170px"
              marginLeft="100px"
              color="white">
              저희 대박 징조는 폴더별로 나눠서 파일을 관리할 수 있습니다
            </Stack>
          </Stack>
          <Stack flexDirection="row" alignItems="center">
            <Stack
              width="350px"
              height="60px"
              marginTop="170px"
              marginLeft="100px"
              color="white">
              저희 대박 징조는 폴더별로 나눠서 파일을 관리할 수 있습니다
            </Stack>
            <Stack
              width="600px"
              height="330px"
              marginTop="170px"
              marginLeft="100px"
              backgroundColor="white"></Stack>
          </Stack>
          <Stack flexDirection="row" alignItems="center">
            <Stack
              width="600px"
              height="330px"
              marginTop="170px"
              marginLeft="100px"
              backgroundColor="white"></Stack>
            <Stack
              width="350px"
              height="60px"
              marginTop="170px"
              marginLeft="100px"
              color="white">
              저희 대박 징조는 폴더별로 나눠서 파일을 관리할 수 있습니다
            </Stack>
          </Stack>
          <Stack flexDirection="row" alignItems="center">
            <Stack
              width="350px"
              height="60px"
              margin="170px 0px 100px 100px"
              color="white">
              저희 대박 징조는 폴더별로 나눠서 파일을 관리할 수 있습니다
            </Stack>
            <Stack
              width="600px"
              height="330px"
              margin="170px 0px 100px 100px"
              backgroundColor="white"></Stack>
          </Stack>
        </Stack>
        <Stack
          style={{
            width: "20%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            marginTop: "15%",
            position: "fixed",
            right: 0,
          }}>
          <Stack width="80%" height="150px" style={{ alignItems: "center" }}>
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
              }}></input>
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
              }}></input>
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
  );
};

export default Register;
