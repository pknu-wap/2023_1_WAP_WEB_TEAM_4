import React from "react";
import { Stack, Chip, Button, IconButton, TextField } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const Write = () => {
  return (
    <Stack height="100%">
      <Stack
        bgcolor="black"
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
      <Stack
        height="5000px"
        paddingTop="60px"
        width="100%"
        bgcolor="black"
        color="white"
        direction="row">
        <Stack
          spacing={2}
          padding="40px 96px 40px 96px"
          bgcolor="black"
          width="50%">
          <Stack fontSize="20px" fontWeight="bold">
            알고리즘에 대해 배워보자
          </Stack>
          <Stack bgcolor="#d9d9d9" width="10%" height="1px"></Stack>
          <Stack
            display="flex"
            alignItems="center"
            height="60px"
            justifyContent="space-between"
            direction="row">
            <Stack
              bgcolor="black"
              paddingTop="10px"
              spacing={1}
              color="white"
              direction="row">
              <Chip label="# 파이썬" />
              <Chip label="# 파이썬" />
              <Chip label="# 파이썬" />
              <Chip label="# 파이썬" />
            </Stack>
            <Stack direction="row">
              <Button
                disableRipple
                sx={{
                  color: "#ECD8A4",
                  ":hover": { color: "#E8AD15" },
                  ":active": { color: "#AF861C" },
                }}
                width="fit-content">
                원본
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "#ECD8A4",
                  border: "1px solid #ECD8A4",
                  ":hover": {
                    border: "1px solid #ECD8A4",
                  },
                }}
                width="fit-content">
                저장
              </Button>
            </Stack>
          </Stack>
          <Stack direction="row" height="25px" width="100%">
            <IconButton color="white">
              <SettingsIcon />
            </IconButton>
            <IconButton>
              <SettingsIcon />
            </IconButton>
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </Stack>
          <TextField
            multiline
            sx={{
              backgroundColor: "#181616",
              "& .MuiOutlinedInput-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid transparent",
                },
              },
              ":hover": {
                "& .MuiOutlinedInput-root": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid transparent",
                  },
                },
              },
            }}
          />
        </Stack>
        <Stack
          padding="40px 96px 40px 96px"
          fontSize="20px"
          fontWeight="bold"
          bgcolor="black"
          width="50%">
          알고리즘에 대해 배워보자
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Write;
