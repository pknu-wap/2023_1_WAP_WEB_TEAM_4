import React, { useState } from "react";
import Header from "../components/Header";
import { IconButton, MenuItem, Select, Stack, TextField } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import { useRecoilValue } from "recoil";
import { searchOpenState } from "../states/homeState";

const Home = () => {
  const [selectValue, setSelectValue] = useState(0);
  const isSearchOpen = useRecoilValue(searchOpenState);
  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

  const array = [
    {
      random: [
        {
          title: "랜덤 제목",
          main_text: "내용",
        },
        {
          title: "제목2",
          main_text: "내용2",
        },
        {
          title: "제목3",
          main_text: "내용3",
        },
        {
          title: "제목4",
          main_text: "내용4",
        },
      ],
    },
    {
      views: [
        {
          title: "조회수 제목",
          main_text: "내용",
        },
        {
          title: "제목2",
          main_text: "내용2",
        },
        {
          title: "제목3",
          main_text: "내용3",
        },
        {
          title: "제목4",
          main_text: "내용4",
        },
      ],
    },
    {
      likes: [
        {
          title: "좋아요 제목",
          main_text: "내용",
        },
        {
          title: "제목2",
          main_text: "내용2",
        },
        {
          title: "제목3",
          main_text: "내용3",
        },
        {
          title: "제목4",
          main_text: "내용4",
        },
      ],
    },
    {
      latest: [
        {
          title: "최근 제목",
          main_text: "내용",
        },
        {
          title: "제목2",
          main_text: "내용2",
        },
        {
          title: "제목3",
          main_text: "내용3",
        },
        {
          title: "제목4",
          main_text: "내용4",
        },
      ],
    },
  ];

  return (
    <Stack height="100%">
      <Header>Home</Header>
      <Stack
        spacing={10}
        height="5000px"
        bgcolor="black"
        padding="150px 96px 40px 96px">
        {isSearchOpen && (
          <Stack direction="row" spacing={4} justifyContent="center">
            <Select
              value={selectValue}
              onChange={handleChange}
              sx={{
                color: selectValue === 0 ? "gray" : "white",
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
              <MenuItem value={0} sx={{ display: "none" }}>
                선택
              </MenuItem>
              <MenuItem value={10}>태그</MenuItem>
              <MenuItem value={20}>작성자</MenuItem>
              <MenuItem value={30}>내용</MenuItem>
            </Select>
            <TextField
              placeholder="검색어를 입력해주세요"
              InputProps={{
                startAdornment: <SearchIcon sx={{ marginRight: "10px" }} />,
              }}
              sx={{
                width: "70%",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused": {
                    "& .MuiOutlinedInput-notchedOutline": {
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
        )}
        {!isSearchOpen &&
          array.map((sudol, index) => {
            const category = ["random", "views", "likes", "latest"];
            return (
              <Stack key={index}>
                <Stack spacing={4} direction="row" justifyContent="center">
                  <Stack color="white" fontSize="20px">
                    {category[index]}
                  </Stack>
                  <IconButton sx={{ borderRadius: "0px" }}>
                    <ChevronLeftIcon />
                  </IconButton>
                  {sudol[category[index]].map((cardContent, i) => {
                    return (
                      <Stack key={i}>
                        <Stack width="300px" height="200px" bgcolor="white" />
                        <Stack color="white">{cardContent.title}</Stack>
                        <Stack color="white">{cardContent.main_text}</Stack>
                      </Stack>
                    );
                  })}

                  <IconButton sx={{ borderRadius: "0px" }}>
                    <ChevronRightIcon />
                  </IconButton>
                </Stack>
              </Stack>
            );
          })}
      </Stack>
    </Stack>
  );
};

export default Home;
