import {
  Button,
  Chip,
  Dialog,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Stack,
  theme,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { useMutation, useQueryClient } from "react-query";
import { PostCreateApi, PostUpdateApi } from "../apis/api/content-api";
import { PostCategoryCreateApi } from "../apis/api/category-api";
import { memberIdState } from "../states/loginState";
import { useRecoilState } from "recoil";
import Snackbar from "./Snackbar";
import { modifyState, visitIdState } from "../states/common";

const WriteModal = ({
  title,
  dialogOpen,
  setDialogOpen,
  tagArray,
  text,
  setText,
  data,
}) => {
  const theme = useTheme();
  const [memberId, setMemberId] = useRecoilState(memberIdState);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const [privateMode, setPrivateMode] = useState(true);
  const [selectValue, setSelectValue] = useState(0);
  const [textFieldValue, setTextFieldValue] = useState("");
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const [image, setImage] = useState("");
  const [modify, setModify] = useRecoilState(modifyState);
  const [visitId, setVisitId] = useRecoilState(visitIdState);

  const navigate = useNavigate();

  const [imageSrc, setImageSrc] = useState(null);

  const fileInput = useRef(null);

  const handleButtonClick = (event) => {
    fileInput.current?.click();
  };

  const onUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    await new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null);
        resolve();
      };
    });
    setImage(file);
  };

  const postCreateQuery = useMutation(PostCreateApi, {
    onSuccess: () => navigate("/"),
  });

  const postUpdateQuery = useMutation(PostUpdateApi, {
    onSuccess: () => navigate("/"),
  });

  const postCategoryCreateQuery = useMutation(PostCategoryCreateApi, {
    onSuccess: () => queryClient.invalidateQueries("CategoryRead"),
  });

  const writeButtonClick = async () => {
    const formData = new FormData();

    const body = {
      loginedMemberId: memberId,
      title,
      text,
      isPrivate: privateMode ? 0 : 1,
      categoryId: selectValue,
      hashtags: tagArray.join(""),
    };
    const bodyUpdate = {
      loginedMemberId: memberId,
      title,
      text,
      isPrivate: privateMode ? 0 : 1,
      categoryId: selectValue,
      hashtags: tagArray.join(""),
      contentId: visitId,
    };

    // formData.append("thumbnail", imageSrc);
    formData.append("thumbnail", image ? image : null);

    const json = JSON.stringify(modify ? bodyUpdate : body);

    const blob = new Blob([json], {
      type: "application/json",
    });

    formData.append("content", blob);

    if (selectValue === 0) {
      setMessage("카테고리를 선택해주세요");
      setOpen(true);
    } else {
      modify
        ? postUpdateQuery.mutate(formData)
        : postCreateQuery.mutate(formData);
    }
  };

  return (
    <Dialog
      open={dialogOpen}
      maxWidth="lg"
      onClose={() => setDialogOpen(false)}
      sx={{
        overflow: "scroll",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Stack
        direction="row"
        borderRadius="4px"
        overflow="scroll"
        bgcolor="background.main"
        border={`1px solid ${theme.palette.primary[100]}`}
        height="600px"
        p="24px 16px">
        <Stack
          gap="20px"
          width="300px"
          alignItems="center"
          p="24px 60px 36px 36px">
          <Stack width="100%">
            <Stack direction="row">
              <Stack
                color="background.color"
                fontSize="20px"
                marginBottom="12px"
                marginRight="4px"
                fontWeight="bold">
                썸네일
              </Stack>
              <Button
                onClick={() => setImageSrc(null)}
                sx={{ height: "23px" }}
                color="error">
                삭제
              </Button>
            </Stack>
            {!imageSrc ? (
              <Stack
                bgcolor="primary.200"
                width="300px"
                height="180px"
                justifyContent="center"
                alignItems="center">
                <IconButton
                  onClick={handleButtonClick}
                  sx={{ width: "50px", height: "50px" }}>
                  <AddIcon sx={{ width: "50px", height: "50px" }} />
                  <input
                    style={{ display: "none" }}
                    type="file"
                    ref={fileInput}
                    onChange={onUpload}
                  />
                </IconButton>
              </Stack>
            ) : (
              <img
                src={imageSrc}
                alt=""
                style={{ width: "300px", height: "180px" }}
              />
            )}
          </Stack>
          <Stack width="100%">
            <Stack color="background.color" fontSize="20px" fontWeight="bold">
              공개 설정
            </Stack>
            <Stack
              marginTop="12px"
              gap="12px"
              direction="row"
              alignItems="center"
              width="fit-content">
              <Button
                variant="contained"
                disableRipple
                onClick={() => {
                  setPrivateMode(true);
                }}
                sx={{
                  backgroundColor: privateMode ? "primary.500" : "white",
                  width: privateMode ? "90px" : "fit-content",
                  height: privateMode ? "60px" : "40px",
                  color: "background.contractColor",
                  ":hover": {
                    backgroundColor: "primary.600",
                    width: "90px",
                    height: "60px",
                    color: "background.contractColor",
                  },
                  ":active": { backgroundColor: "primary.700" },
                }}>
                비공개
              </Button>
              <Button
                variant="contained"
                size="small"
                disableRipple
                onClick={() => {
                  setPrivateMode(false);
                }}
                sx={{
                  backgroundColor: !privateMode ? "primary.500" : "white",
                  width: !privateMode ? "90px" : "fit-content",
                  height: !privateMode ? "60px" : "40px",
                  color: "background.contractColor",
                  ":hover": {
                    backgroundColor: "primary.600",
                    width: "90px",
                    height: "60px",
                    color: "background.contractColor",
                  },
                  ":active": { backgroundColor: "primary.700" },
                }}>
                공개
              </Button>
            </Stack>
          </Stack>
          <Stack width="100%">
            <Stack color="background.color" fontSize="20px" fontWeight="bold">
              태그 목록
            </Stack>
            <Stack
              direction="row"
              marginTop="12px"
              gap="12px"
              maxHeight="170px"
              overflow="scroll"
              flexWrap="wrap">
              {tagArray.map((tag, i) => (
                <Chip
                  sx={{
                    border: `1px solid ${theme.palette.primary[200]}`,
                    backgroundColor: "transparent",
                    color: "background.color",
                    padding: "1px",
                    width: "fit-content",
                    "& .MuiChip-deleteIcon": {
                      color: "#F3F4F6",
                      ":hover": {
                        color: "#D1D5DB",
                      },
                      ":active": {
                        color: "#9CA3AF",
                      },
                    },
                  }}
                  key={i}
                  label={`# ${tag}`}
                />
              ))}
            </Stack>
            {isPhone && (
              <>
                <Stack
                  color="black"
                  fontSize="20px"
                  fontWeight="bold"
                  marginBottom="12px">
                  카테고리
                </Stack>
                <Stack oveflow="scroll">
                  <Stack gap="12px" direction="row" flexWrap="wrap">
                    <Stack width="100%" direction="row" marginBottom="8px">
                      <TextField
                        variant="standard"
                        value={textFieldValue}
                        onChange={(e) => {
                          setTextFieldValue(e.target.value);
                        }}
                      />
                      <MenuItem
                        onClick={() => {
                          if (textFieldValue) {
                            const formData = new FormData();
                            formData.append("loginedMemberId", memberId);
                            formData.append("name", textFieldValue);

                            postCategoryCreateQuery.mutate(formData);
                            setTextFieldValue("");
                          } else {
                            setMessage("빈 값은 추가할 수 없습니다.");
                            setOpen(true);
                          }
                        }}
                        sx={{ color: "primary.500", padding: "2px 16px" }}>
                        카테고리 추가
                      </MenuItem>
                    </Stack>
                    <Select
                      size="size"
                      value={selectValue}
                      onChange={(event) => setSelectValue(event.target.value)}
                      sx={{
                        width: "300px",
                        color: selectValue === 0 ? "gray" : "background.color",
                        "&.MuiOutlinedInput-root": {
                          "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: `1px solid ${theme.palette.primary[200]}`,
                            },
                          },
                          ":hover": {
                            "&.MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.primary[200]}`,
                              },
                            },
                          },
                        },
                      }}>
                      <MenuItem value={0} sx={{ display: "none" }}>
                        선택
                      </MenuItem>
                      {data?.map((category, index) => (
                        <MenuItem value={category?.categoryId} key={index}>
                          {category?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Stack>
                <Button
                  onClick={writeButtonClick}
                  sx={{ margin: "24px 0px" }}
                  variant="contained">
                  발행
                </Button>
              </>
            )}
          </Stack>
        </Stack>
        <Stack width="1px" height="600px" bgcolor="primary.100"></Stack>
        {!isPhone && (
          <Stack
            width="300px"
            alignItems="center"
            justifyContent="space-between"
            p="24px 36px 0px 60px">
            <Stack height="300px">
              <Stack
                color="background.color"
                fontSize="20px"
                marginBottom="12px"
                fontWeight="bold">
                미리보기
              </Stack>
              <Stack width="300px">
                {!imageSrc ? (
                  <Stack
                    backgroundColor="primary.200"
                    width="300px"
                    height="180px"
                    marginBottom="8px"
                  />
                ) : (
                  <img
                    src={imageSrc}
                    alt=""
                    style={{ width: "300px", height: "180px" }}
                  />
                )}
                <Stack
                  color="background.color"
                  fontSize="16px"
                  fontWeight="bold">
                  {title}
                </Stack>
                <textarea
                  type="text"
                  placeholder="내용을 입력해주세요."
                  value={text?.substr(0, 100)}
                  onChange={(event) => {
                    setText(event.target.value);
                  }}
                  style={{
                    color: theme.palette.background.color,
                    fontSize: "12px",
                    resize: "none",
                    height: "100px",
                    backgroundColor: "inherit",
                    wordBreak: "keep-all",
                    outline: "none",
                    border: "0px solid transparent",
                  }}
                />
              </Stack>
              <Stack
                color="black"
                fontSize="20px"
                fontWeight="bold"
                marginBottom="12px">
                카테고리
              </Stack>
              <Stack oveflow="scroll">
                <Stack gap="12px" direction="row" flexWrap="wrap">
                  <Stack width="100%" direction="row" marginBottom="8px">
                    <TextField
                      variant="standard"
                      value={textFieldValue}
                      onChange={(e) => {
                        setTextFieldValue(e.target.value);
                      }}
                    />
                    <MenuItem
                      onClick={() => {
                        if (textFieldValue) {
                          const formData = new FormData();
                          formData.append("loginedMemberId", memberId);
                          formData.append("name", textFieldValue);

                          postCategoryCreateQuery.mutate(formData);
                          setTextFieldValue("");
                        } else {
                          setMessage("빈 값은 추가할 수 없습니다.");
                          setOpen(true);
                        }
                      }}
                      sx={{ color: "primary.500", padding: "2px 16px" }}>
                      카테고리 추가
                    </MenuItem>
                  </Stack>
                  <Select
                    size="size"
                    value={selectValue}
                    onChange={(event) => setSelectValue(event.target.value)}
                    sx={{
                      width: "300px",
                      color: selectValue === 0 ? "gray" : "background.color",
                      "&.MuiOutlinedInput-root": {
                        "&.Mui-focused": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: `1px solid ${theme.palette.primary[200]}`,
                          },
                        },
                        ":hover": {
                          "&.MuiOutlinedInput-root": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: `1px solid ${theme.palette.primary[200]}`,
                            },
                          },
                        },
                      },
                    }}>
                    <MenuItem value={0} sx={{ display: "none" }}>
                      선택
                    </MenuItem>
                    {data?.map((category, index) => (
                      <MenuItem value={category?.categoryId} key={index}>
                        {category?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
              </Stack>
            </Stack>
            <Stack alignItems="flex-end" width="100%">
              <Button
                variant="contained"
                disableRipple
                onClick={writeButtonClick}
                sx={{
                  color: "background.contractColor",
                  backgroundColor: "primary.500",
                  ":hover": { backgroundColor: "primary.600" },
                  ":active": { backgroundColor: "primary.700" },
                }}>
                발행
              </Button>
            </Stack>
          </Stack>
        )}
        <Snackbar open={open} setOpen={setOpen} title={message} color="error" />
      </Stack>
    </Dialog>
  );
};

export default WriteModal;
