import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import { useRecoilValue, useRecoilState } from "recoil";
import { searchOpenState, selectValueState } from "../states/homeState";
import axios from "axios";
import { gray } from "../themes/color";
import { useTheme } from "@mui/material/styles";
import {
  useGetFindHashtagQuery,
  useGetFindMemberQuery,
  useGetFindStringQuery,
  useGetMainMoreQuery,
  useGetMainQuery,
} from "../apis/api/content-api";
import Layout from "../components/Layout";
import Slide from "react-reveal/Slide";
import RubberBand from "react-reveal/RubberBand";
import Wobble from "react-reveal/Wobble";
import Fade from "react-reveal/Fade";
import { useNavigate } from "react-router-dom";
import { visitIdState } from "../states/common";

const Home = () => {
  const navigate = useNavigate();
  const [visitId, setVisitId] = useRecoilState(visitIdState);
  const [selectValue, setSelectValue] = useRecoilState(selectValueState);
  const isSearchOpen = useRecoilValue(searchOpenState);
  const [count, setCount] = useState(0);
  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };
  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down("600"));

  const [string, setString] = useState("");
  const theme = useTheme();
  const [searchArray, setSearchArray] = useState({
    craeted: [],
    likes: [],
    randoms: [],
    views: [],
  });

  const { data } = useGetMainQuery({ index: count });

  useEffect(() => {
    if (data) {
      setSearchArray((search) => ({
        ...search,
        craeted: [...search.craeted, ...(data.craeted?.contentDTOS || [])],
        likes: [...search.likes, ...(data.likes?.contentDTOS || [])],
        randoms: [...search.randoms, ...(data.randoms?.contentDTOS || [])],
        views: [...search.views, ...(data.views?.contentDTOS || [])],
      }));
    }
  }, [data]);

  const category = ["craeted", "likes", "views", "randoms"];
  const [startNumber, setStartNumber] = useState({
    randoms: 0,
    views: 0,
    likes: 0,
    craeted: 0,
  });

  const { data: stringData } = useGetFindStringQuery({ string });
  // const { data: hashtagData } = useGetFindHashtagQuery({ string });
  // const { data: memberData } = useGetFindMemberQuery({ string });
  return (
    <Layout isHome>
      <Stack
        width="100%"
        bgcolor="background.main"
        spacing={25}
        padding="5% 96px 40px 96px">
        {isSearchOpen && (
          <Slide top>
            <Stack direction="row" spacing={4} justifyContent="center">
              <TextField
                placeholder="검색어를 입력해주세요"
                InputProps={{
                  startAdornment: <SearchIcon sx={{ marginRight: "10px" }} />,
                }}
                value={string}
                onChange={(event) => setString(event.target.value)}
                sx={{
                  width: "50%",
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
          </Slide>
        )}
        {!isSearchOpen ? (
          category?.map((categoryName, i) => {
            return (
              <Fade key={i}>
                <RubberBand spy={startNumber}>
                  {isMobile ? (
                    <Stack key={i} spacing={4}>
                      <Stack
                        color="background.color"
                        fontSize="20px"
                        width="65px">
                        {categoryName === "craeted" ? "created" : categoryName}
                      </Stack>
                      <Stack direction="row">
                        <IconButton
                          onClick={() =>
                            setStartNumber((prevNumber) => {
                              const updatedNumber = {
                                ...prevNumber,
                                [categoryName]:
                                  prevNumber[categoryName] === 0
                                    ? prevNumber[categoryName]
                                    : prevNumber[categoryName] - 1,
                              };

                              return updatedNumber;
                            })
                          }
                          sx={{ borderRadius: "0px" }}>
                          <ChevronLeftIcon />
                        </IconButton>
                        {searchArray?.[categoryName]
                          ?.slice(
                            startNumber[categoryName],
                            startNumber[categoryName] + 1
                          )
                          .map((content, index) => {
                            return (
                              <Stack key={index} flex={1}>
                                <Stack
                                  width="200px"
                                  height="200px"
                                  bgcolor={gray[300]}
                                  marginBottom="8px"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    setVisitId(content.contentId);
                                    navigate("/");
                                  }}
                                />
                                <Stack
                                  color="background.color"
                                  fontSize="16px"
                                  fontWeight="bold">
                                  {content?.title}
                                </Stack>
                                <Stack color="background.color" fontSize="12px">
                                  {content?.text}
                                </Stack>
                              </Stack>
                            );
                          })}
                        <IconButton
                          onClick={() => {
                            setCount(count + 1);
                            setStartNumber((prevNumber) => {
                              const updatedNumber = {
                                ...prevNumber,
                                [categoryName]:
                                  prevNumber[categoryName] ===
                                  searchArray.craeted.length - 1
                                    ? prevNumber[categoryName]
                                    : prevNumber[categoryName] + 1,
                              };

                              return updatedNumber;
                            });
                          }}
                          sx={{ borderRadius: "0px" }}>
                          <ChevronRightIcon />
                        </IconButton>
                      </Stack>
                    </Stack>
                  ) : (
                    <Stack key={i} spacing={4} direction="row">
                      <Stack
                        color="background.color"
                        fontSize="20px"
                        width="65px">
                        {categoryName === "craeted" ? "created" : categoryName}
                      </Stack>
                      <IconButton
                        onClick={() =>
                          setStartNumber((prevNumber) => {
                            const updatedNumber = {
                              ...prevNumber,
                              [categoryName]:
                                prevNumber[categoryName] === 0
                                  ? prevNumber[categoryName]
                                  : prevNumber[categoryName] - 4,
                            };

                            return updatedNumber;
                          })
                        }
                        sx={{ borderRadius: "0px" }}>
                        <ChevronLeftIcon />
                      </IconButton>
                      {searchArray?.[categoryName]
                        ?.slice(
                          startNumber[categoryName],
                          startNumber[categoryName] + 4
                        )
                        .map((content, index) => {
                          return (
                            <Stack key={index} flex={1}>
                              <Stack
                                height="200px"
                                bgcolor={gray[300]}
                                marginBottom="8px"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setVisitId(content.contentId);
                                  navigate("/");
                                }}
                              />
                              <Stack
                                color="background.color"
                                fontSize="16px"
                                fontWeight="bold">
                                {content?.title}
                              </Stack>
                              <Stack color="background.color" fontSize="12px">
                                {content?.text}
                              </Stack>
                            </Stack>
                          );
                        })}
                      <IconButton
                        onClick={() => {
                          setCount(count + 1);
                          setStartNumber((prevNumber) => {
                            const updatedNumber = {
                              ...prevNumber,
                              [categoryName]:
                                prevNumber[categoryName] ===
                                searchArray.craeted.length - 4
                                  ? prevNumber[categoryName]
                                  : prevNumber[categoryName] + 4,
                            };

                            return updatedNumber;
                          });
                        }}
                        sx={{ borderRadius: "0px" }}>
                        <ChevronRightIcon />
                      </IconButton>
                    </Stack>
                  )}
                </RubberBand>
              </Fade>
            );
          })
        ) : (
          <Stack direction="row" width="100%" paddingLeft="2%" flexWrap="wrap">
            {stringData?.contentDTOS?.map((card, index) => {
              return (
                <Fade key={index}>
                  <Stack direction="row" justifyContent="flex-start">
                    <Stack marginLeft="32px" marginBottom="24px">
                      <Stack
                        minWidth="300px"
                        minHeight="200px"
                        flex={1}
                        bgcolor={gray[300]}
                        marginBottom="8px"
                      />
                      <Stack
                        color="background.color"
                        fontSize="16px"
                        fontWeight="bold">
                        {card?.title}
                      </Stack>
                      <Stack color="background.color" fontSize="12px">
                        {card?.text}
                      </Stack>
                    </Stack>
                  </Stack>
                </Fade>
              );
            })}
          </Stack>
        )}
      </Stack>
    </Layout>
  );
};

export default Home;
