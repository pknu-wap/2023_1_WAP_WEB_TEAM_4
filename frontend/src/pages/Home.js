import React from "react";
import Header from "../components/Header";
import { IconButton, MenuItem, Select, Stack, TextField } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";

const Home = () => {
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Stack height="100%">
      <Header>Home</Header>
      <Stack
        spacing={10}
        height="5000px"
        bgcolor="black"
        padding="100px 96px 40px 96px">
        <Stack direction="row" spacing={4} justifyContent="center">
          <Select
            value={age}
            onChange={handleChange}
            sx={{
              color: "white",
              width: "10%",
              "&.MuiOutlinedInput-root": {
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #ECD8A4",
                  },
                },
                ":hover": {
                  "&.MuiOutlinedInput-root": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #ECD8A4",
                    },
                  },
                },
              },
            }}>
            <MenuItem value={10}>태그</MenuItem>
            <MenuItem value={20}>작성자</MenuItem>
            <MenuItem value={30}>내용</MenuItem>
          </Select>
          <TextField
            InputProps={{
              startAdornment: <SearchIcon sx={{ marginRight: "10px" }} />,
            }}
            sx={{
              width: "70%",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    //   border: "1px solid white",
                    border: "1px solid #ECD8A4",
                  },
                },
              },
              ":hover": {
                "& .MuiOutlinedInput-root": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "0.1px solid #ECD8A4",
                  },
                },
              },
            }}
          />
        </Stack>
        <Stack spacing={4} direction="row">
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <Stack width="300px" height="200px" bgcolor="white" />
          <Stack width="300px" height="200px" bgcolor="white" />
          <Stack width="300px" height="200px" bgcolor="white" />
          <Stack width="300px" height="200px" bgcolor="white" />
          <Stack width="300px" height="200px" bgcolor="white" />
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </Stack>
        <Stack spacing={4} direction="row">
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <Stack width="300px" height="200px" bgcolor="white" />
          <Stack width="300px" height="200px" bgcolor="white" />
          <Stack width="300px" height="200px" bgcolor="white" />
          <Stack width="300px" height="200px" bgcolor="white" />
          <Stack width="300px" height="200px" bgcolor="white" />
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </Stack>
        <Stack spacing={4} direction="row">
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <Stack width="300px" height="200px" bgcolor="white" />
          <Stack width="300px" height="200px" bgcolor="white" />
          <Stack width="300px" height="200px" bgcolor="white" />
          <Stack width="300px" height="200px" bgcolor="white" />
          <Stack width="300px" height="200px" bgcolor="white" />
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </Stack>
        <Stack spacing={4} direction="row">
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <Stack width="300px" height="200px" bgcolor="white" />
          <Stack width="300px" height="200px" bgcolor="white" />
          <Stack width="300px" height="200px" bgcolor="white" />
          <Stack width="300px" height="200px" bgcolor="white" />
          <Stack width="300px" height="200px" bgcolor="white" />
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Home;