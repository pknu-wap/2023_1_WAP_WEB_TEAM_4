import {
  Button,
  Chip,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { mint } from "../themes/color";
import AddIcon from "@mui/icons-material/Add";

const WriteModal = ({
  title,
  dialogOpen,
  setDialogOpen,
  tagArray,
  text,
  setText,
}) => {
  const [privateMode, setPrivateMode] = useState(true);
  const [publicMode, setPublicMode] = useState(false);
  const [autoPublicMode, setAutoPublicMode] = useState(false);
  const [selectValue, setSelectValue] = useState(0);
  const [textFieldValue, setTextFieldValue] = useState("");

  const [categoryArray, setCategoryArray] = useState([
    "데이터분석",
    "프론트엔드",
    "머신러닝",
    "알고리즘",
  ]);

  const navigate = useNavigate();

  const [imageSrc, setImageSrc] = useState(null);

  const fileInput = useRef(null);

  const handleButtonClick = (event) => {
    fileInput.current?.click();
  };

  const onUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null);
        resolve();
      };
    });
  };

  const writeButtonClick = async () => {
    const body = {
      title: title,
      text: text,
      category: "미정",
      hashtag: tagArray,
    };

    try {
      await axios.post(
        "http://test-env.eba-babq7paf.us-east-1.elasticbeanstalk.com/content/create",
        body
      );
      navigate("/");
      alert("성공");

      setDialogOpen(false);
    } catch (e) {
      alert("실패");
    }
  };
  return (
    <Modal
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      sx={{
        overflow: "scroll",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        direction="row"
        borderRadius="4px"
        overflow="scroll"
        bgcolor="white"
        height="600px"
        p="24px 16px"
      >
        <Stack
          gap="20px"
          width="300px"
          alignItems="center"
          p="24px 60px 36px 36px"
        >
          <Stack width="100%">
            <Stack direction="row">
              <Stack
                color="black"
                fontSize="20px"
                marginBottom="12px"
                marginRight="4px"
                fontWeight="bold"
              >
                썸네일
              </Stack>
              <Button
                onClick={() => setImageSrc(null)}
                sx={{ height: "23px" }}
                color="error"
              >
                삭제
              </Button>
            </Stack>
            {!imageSrc ? (
              <Stack
                bgcolor={mint[200]}
                width="300px"
                height="180px"
                justifyContent="center"
                alignItems="center"
              >
                <IconButton
                  onClick={handleButtonClick}
                  sx={{ width: "50px", height: "50px" }}
                >
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
            <Stack color="black" fontSize="20px" fontWeight="bold">
              공개 설정
            </Stack>
            <Stack
              marginTop="12px"
              gap="12px"
              direction="row"
              alignItems="center"
              width="fit-content"
            >
              <Button
                variant="contained"
                disableRipple
                onClick={() => {
                  setPrivateMode(true);
                  setPublicMode(false);
                  setAutoPublicMode(false);
                }}
                sx={{
                  backgroundColor: privateMode ? mint[500] : "white",
                  width: privateMode ? "90px" : "fit-content",
                  height: privateMode ? "60px" : "40px",
                  color: privateMode ? "white" : mint[500],
                  ":hover": {
                    backgroundColor: mint[600],
                    width: "90px",
                    height: "60px",
                    color: "white",
                  },
                  ":active": { backgroundColor: mint[700] },
                }}
              >
                비공개
              </Button>
              <Button
                variant="contained"
                size="small"
                disableRipple
                onClick={() => {
                  setPrivateMode(false);
                  setPublicMode(true);
                  setAutoPublicMode(false);
                }}
                sx={{
                  backgroundColor: publicMode ? mint[500] : "white",
                  width: publicMode ? "90px" : "fit-content",
                  height: publicMode ? "60px" : "40px",
                  color: publicMode ? "white" : mint[500],
                  ":hover": {
                    backgroundColor: mint[600],
                    width: "90px",
                    height: "60px",
                    color: "white",
                  },
                  ":active": { backgroundColor: mint[700] },
                }}
              >
                공개
              </Button>
              <Button
                variant="contained"
                size="small"
                disableRipple
                onClick={() => {
                  setPrivateMode(false);
                  setPublicMode(false);
                  setAutoPublicMode(true);
                }}
                sx={{
                  backgroundColor: autoPublicMode ? mint[500] : "white",
                  width: autoPublicMode ? "90px" : "fit-content",
                  height: autoPublicMode ? "60px" : "40px",
                  color: autoPublicMode ? "white" : mint[500],
                  ":hover": {
                    backgroundColor: mint[600],
                    width: "90px",
                    height: "60px",
                    color: "white",
                  },
                  ":active": { backgroundColor: mint[700] },
                }}
              >
                자동 공개
              </Button>
            </Stack>
          </Stack>
          <Stack width="100%">
            <Stack color="black" fontSize="20px" fontWeight="bold">
              태그 목록
            </Stack>
            <Stack
              direction="row"
              marginTop="12px"
              gap="12px"
              maxHeight="170px"
              overflow="scroll"
              flexWrap="wrap"
            >
              {tagArray.map((tag, i) => (
                <Chip
                  sx={{
                    border: `1px solid ${mint[400]}`,
                    backgroundColor: mint[100],
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
          </Stack>
        </Stack>
        <Stack width="1px" height="600px" bgcolor={mint[100]}></Stack>
        <Stack
          width="300px"
          alignItems="center"
          justifyContent="space-between"
          p="24px 36px 0px 60px"
        >
          <Stack height="300px">
            <Stack
              color="black"
              fontSize="20px"
              marginBottom="12px"
              fontWeight="bold"
            >
              미리보기
            </Stack>
            <Stack width="300px">
              {!imageSrc ? (
                <Stack
                  backgroundColor={mint[200]}
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
              <Stack color="black" fontSize="16px" fontWeight="bold">
                {title}
              </Stack>
              <textarea
                type="text"
                placeholder="내용을 입력해주세요."
                value={text.substr(0, 100)}
                onChange={(event) => {
                  setText(event.target.value);
                }}
                style={{
                  color: "black",
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
              marginBottom="12px"
            >
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
                      setCategoryArray([...categoryArray, textFieldValue]);
                      setTextFieldValue("");
                    }}
                    sx={{ color: mint[500], padding: "2px 16px" }}
                  >
                    카테고리 추가
                  </MenuItem>
                </Stack>
                <Select
                  size="size"
                  value={selectValue}
                  onChange={(event) => setSelectValue(event.target.value)}
                  sx={{
                    width: "300px",
                    color: selectValue === 0 ? "gray" : "black",
                    "&.MuiOutlinedInput-root": {
                      "&.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: `1px solid ${mint[200]}`,
                        },
                      },
                      ":hover": {
                        "&.MuiOutlinedInput-root": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: `1px solid ${mint[200]}`,
                          },
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value={0} sx={{ display: "none" }}>
                    선택
                  </MenuItem>
                  {categoryArray.map((category, index) => (
                    <MenuItem value={index + 1} key={index}>
                      {category}
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
                color: "white",
                backgroundColor: mint[500],
                ":hover": { backgroundColor: mint[600] },
              }}
            >
              발행
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default WriteModal;
