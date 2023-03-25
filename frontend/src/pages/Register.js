import React from "react";
import { Stack, Button } from "@mui/material";
import {useNavigate} from "react-router-dom"

const Register = () => {
  const navigate = useNavigate()
  return (
    <Stack style={{ backgroundColor: "black" }}>
      <Stack style={{ width: "100%", fontWeight: "bold", color: "#ECD8A4", fontSize: "30px", position: "fixed", padding: "10px 0px 10px 20px"  }}>
        GLOG
      </Stack>
      <Stack flexDirection="row">
        <Stack style={{ width: "80%" }}>
          <Stack flexDirection="row" alignItems="center">
            <Stack width="600px" height="330px" marginTop="170px" marginLeft="100px" backgroundColor="white"></Stack>
            <Stack width="350px" height="60px" marginTop="170px" marginLeft="100px" color="white">저희 대박 징조는 폴더별로 나눠서 파일을 관리할 수 있습니다</Stack>
          </Stack>
          <Stack flexDirection="row" alignItems="center">
            <Stack width="350px" height="60px" marginTop="170px" marginLeft="100px" color="white">저희 대박 징조는 폴더별로 나눠서 파일을 관리할 수 있습니다</Stack>
            <Stack width="600px" height="330px" marginTop="170px" marginLeft="100px" backgroundColor="white"></Stack>
          </Stack>
          <Stack flexDirection="row" alignItems="center">
            <Stack width="600px" height="330px" marginTop="170px" marginLeft="100px" backgroundColor="white"></Stack>
            <Stack width="350px" height="60px" marginTop="170px" marginLeft="100px" color="white">저희 대박 징조는 폴더별로 나눠서 파일을 관리할 수 있습니다</Stack>
          </Stack>
          <Stack flexDirection="row" alignItems="center">
            <Stack width="350px" height="60px" margin="170px 0px 100px 100px" color="white">저희 대박 징조는 폴더별로 나눠서 파일을 관리할 수 있습니다</Stack>
            <Stack width="600px" height="330px" margin="170px 0px 100px 100px" backgroundColor="white"></Stack>
          </Stack>
        </Stack>
        <Stack style={{  width: "20%", 
        height: "100%", display: "flex", alignItems: "center", marginTop: "15%",
        position: "fixed", right: 0 }}>
          <Stack
            width="80%"
            height="150px"
            style={{ alignItems: "center"}}
          >
            <Stack fontWeight="bold" fontSize="20px" color="#ECD8A4" marginBottom="30px">Regsiter</Stack>
            <input placeholder="Email" style={{color: "#ffffff",width : "80%",outline: "transparent", backgroundColor: "transparent", border: "transparent", borderBottom: "1px solid #ffffff", marginBottom: "25px"}} ></input>
            <input placeholder="Password" style={{color: "#ffffff",  marginBottom: "25px", outline: "transparent", width : "80%", backgroundColor: "transparent", border: "transparent", borderBottom: "1px solid #ffffff"}} ></input>
            <input placeholder="Password Check" style={{color: "#ffffff",  marginBottom: "25px", outline: "transparent", width : "80%", backgroundColor: "transparent", border: "transparent", borderBottom: "1px solid #ffffff"}} ></input>
            <input placeholder="Nickname" style={{color: "#ffffff",  marginBottom: "25px", outline: "transparent", width : "80%", backgroundColor: "transparent", border: "transparent", borderBottom: "1px solid #ffffff"}} ></input>
            <input placeholder="Address" style={{color: "#ffffff",  marginBottom: "25px", outline: "transparent", width : "80%", backgroundColor: "transparent", border: "transparent", borderBottom: "1px solid #ffffff"}} ></input>
            <Button onClick={()=> navigate("/login")} variant="outlined" sx={{width:"80%", "&.MuiButton-root": {border: "1px solid #ECD8A4", color: "#ECD8A4"}}}>Register</Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Register;
