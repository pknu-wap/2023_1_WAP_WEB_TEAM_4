import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { IconButton, MenuItem, Select, Stack, TextField } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import { useRecoilValue, useRecoilState } from "recoil";
import { searchOpenState, selectValueState } from "../states/homeState";
import axios from "axios";
import { gray } from "../themes/color";
import { useTheme } from "@mui/material/styles";
import { useGetMainQuery } from "../apis/api/content-api";

const Home = () => {
  const [selectValue, setSelectValue] = useRecoilState(selectValueState);
  const isSearchOpen = useRecoilValue(searchOpenState);
  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };
  const theme = useTheme();

  const { data } = useGetMainQuery();

  console.log(data?.contents);

  const [array, setArray] = useState([
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
        {
          title: "제목5",
          main_text: "내용5",
        },
        {
          title: "제목6",
          main_text: "내용5",
        },
        {
          title: "제목7",
          main_text: "내용5",
        },
        {
          title: "제목8",
          main_text: "내용5",
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
  ]);

  const category = ["created", "likes", "views", "randoms"];
  const [startNumber, setStartNumber] = useState({
    random: 0,
    views: 0,
    likes: 0,
    latest: 0,
  });
  const [isHome, setIsHome] = useState(false);

  // useEffect(() => {
  //   setIsHome(true);
  //   const getPostData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://test-env.eba-babq7paf.us-east-1.elasticbeanstalk.com/main"
  //       );

  //       setArray(response.data);
  //     } catch (e) {
  //       alert(e.response);
  //       console.log(e);
  //     }
  //   };
  // }, []);

  return (
    <Stack>
      <Header isHome={isHome}>Home</Header>
      <Stack
        bgcolor="background.main"
        spacing={10}
        minHeight="79vh"
        padding="180px 96px 40px 96px">
        {isSearchOpen && (
          <Stack direction="row" spacing={4} justifyContent="center">
            <Select
              value={selectValue}
              onChange={handleChange}
              sx={{
                color: selectValue === 0 ? "gray" : "background.color",
                width: "10%",
                "&.MuiOutlinedInput-root": {
                  "&.Mui-focused": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: `1px solid ${theme.palette.primary[500]}`,
                    },
                  },
                  ":hover": {
                    "&.MuiOutlinedInput-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: `1px solid ${theme.palette.primary[500]}`,
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
                      border: `1px solid ${theme.palette.primary[500]}`,
                    },
                  },
                },
                ":hover": {
                  "& .MuiOutlinedInput-root": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: `1px solid ${theme.palette.primary[500]}`,
                    },
                  },
                },
              }}
            />
          </Stack>
        )}
        {category.forEach((categoryName, i) => {
          console.log(categoryName);
          console.log(data?.contents[categoryName]);

          data?.contents[categoryName]?.map((content, index) => {
            console.log(content.contentDTOS);
            return <></>;
          });
        })}
      </Stack>
    </Stack>
  );
};

export default Home;

// {!isSearchOpen
//   ? data?.map((card, index) => {
//       const categoryName = category[index];
//       return (
//         <Stack key={index} spacing={4} direction="row">
//           <Stack>
//             <Stack
//               color="background.color"
//               fontSize="20px"
//               width="65px">
//               {categoryName}
//             </Stack>
//           </Stack>
//           <IconButton
//             onClick={() =>
//               setStartNumber((prevNumber) => {
//                 const updatedNumber = {
//                   ...prevNumber,
//                   [categoryName]:
//                     prevNumber[categoryName] === 0
//                       ? prevNumber[categoryName]
//                       : prevNumber[categoryName] - 4,
//                 };

//                 return updatedNumber;
//               })
//             }
//             sx={{ borderRadius: "0px" }}>
//             <ChevronLeftIcon />
//           </IconButton>
//           {card?.contentDTOS[categoryName]
//             .slice(
//               startNumber[categoryName],
//               startNumber[categoryName] + 4
//             )
//             .map((cardContent, i) => {
//               return (
// <Stack key={i} flex={1}>
//   <Stack
//     minWidth="300px"
//     minHeight="200px"
//     bgcolor={gray[300]}
//     marginBottom="8px"
//   />
//   <Stack
//     color="background.color"
//     fontSize="16px"
//     fontWeight="bold">
//     {cardContent.title}
//   </Stack>
//   <Stack color="background.color" fontSize="12px">
//     {cardContent.main_text}
//   </Stack>
// </Stack>
//               );
//             })}
//           <IconButton
//             onClick={() =>
//               setStartNumber((prevNumber) => {
//                 const updatedNumber = {
//                   ...prevNumber,
//                   [categoryName]:
//                     prevNumber[categoryName] ===
//                     card[categoryName]?.length - 4
//                       ? prevNumber[categoryName]
//                       : prevNumber[categoryName] + 4,
//                 };

//                 return updatedNumber;
//               })
//             }
//             sx={{ borderRadius: "0px" }}>
//             <ChevronRightIcon />
//           </IconButton>
//         </Stack>
//       );
//     })
//   : array.map((card, index) => {
//       return (
//         <Stack
//           key={index}
//           direction="row"
//           width="fit-content"
//           paddingLeft="6.5%"
//           justifyContent="flex-start"
//           flexWrap="wrap">
//           {card.random?.map((cardContent, i) => {
//             return (
//               <Stack key={i} marginLeft="32px" marginBottom="24px">
//                 <Stack
//                   minWidth="300px"
//                   minHeight="200px"
//                   flex={1}
//                   bgcolor={gray[300]}
//                   marginBottom="8px"
//                 />
//                 <Stack
//                   color="background.color"
//                   fontSize="16px"
//                   fontWeight="bold">
//                   {cardContent.title}
//                 </Stack>
//                 <Stack color="background.color" fontSize="12px">
//                   {cardContent.main_text}
//                 </Stack>
//               </Stack>
//             );
//           })}
//         </Stack>
//       );
//     })}
