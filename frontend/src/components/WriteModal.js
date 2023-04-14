import { Button, Chip, Modal, Stack } from "@mui/material";
import React, { useState } from "react";

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
  return (
    <Modal
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Stack
        direction="row"
        borderRadius="8px"
        overflow="scroll"
        bgcolor="#565C69"
        height="600px"
        p="24px 16px">
        <Stack
          gap="16px"
          width="300px"
          alignItems="center"
          p="24px 60px 36px 36px">
          <Stack width="100%">
            <Stack color="white" fontSize="20px" fontWeight="bold">
              썸네일
            </Stack>
            <Stack
              marginTop="12px"
              bgcolor="white"
              width="300px"
              height="180px"
            />
          </Stack>
          <Stack width="100%">
            <Stack color="white" fontSize="20px" fontWeight="bold">
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
                  setPublicMode(false);
                  setAutoPublicMode(false);
                }}
                sx={{
                  backgroundColor: privateMode ? "#fff0ba" : "white",
                  width: privateMode ? "90px" : "fit-content",
                  height: privateMode ? "60px" : "40px",
                  color: "#ccaa00",
                  ":hover": {
                    backgroundColor: "#fff0ba",
                    width: "90px",
                    height: "60px",
                  },
                  ":active": { backgroundColor: "#ffe997" },
                }}>
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
                  backgroundColor: publicMode ? "#fff0ba" : "white",
                  width: publicMode ? "90px" : "fit-content",
                  height: publicMode ? "60px" : "40px",
                  color: "#ccaa00",
                  ":hover": {
                    backgroundColor: "#fff0ba",
                    width: "90px",
                    height: "60px",
                  },
                  ":active": { backgroundColor: "#ffe997" },
                }}>
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
                  backgroundColor: autoPublicMode ? "#fff0ba" : "white",
                  width: autoPublicMode ? "90px" : "fit-content",
                  height: autoPublicMode ? "60px" : "40px",
                  color: "#ccaa00",
                  ":hover": {
                    backgroundColor: "#fff0ba",
                    width: "90px",
                    height: "60px",
                  },
                  ":active": { backgroundColor: "#ffe997" },
                }}>
                자동 공개
              </Button>
            </Stack>
          </Stack>
          <Stack width="100%">
            <Stack color="white" fontSize="20px" fontWeight="bold">
              태그 목록
            </Stack>
            <Stack
              direction="row"
              marginTop="12px"
              gap="12px"
              maxHeight="170px"
              overflow="scroll"
              flexWrap="wrap">
              {tagArray.map((tag, i) => {
                return (
                  <Chip
                    sx={{
                      border: "1px solid #ECD8A4",
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
                );
              })}
            </Stack>
          </Stack>
        </Stack>
        <Stack width="1px" height="600px" bgcolor="#C3C6CD"></Stack>
        <Stack
          width="300px"
          alignItems="center"
          justifyContent="space-between"
          p="24px 36px 0px 60px">
          <Stack height="300px">
            <Stack color="white" fontSize="20px" fontWeight="bold">
              미리보기
            </Stack>
            <Stack width="300px">
              <Stack
                marginTop="12px"
                backgroundColor="white"
                width="300px"
                height="180px"
                marginBottom="16px"
              />
              <Stack color="white" fontSize="16px" fontWeight="bold">
                {title}
              </Stack>
              <textarea
                type="text"
                value={text.substr(0, 100)}
                onChange={(event) => {
                  setText(event.target.value);
                }}
                style={{
                  color: "white",
                  fontSize: "12px",
                  resize: "none",
                  height: "260px",
                  backgroundColor: "#565C69",
                  wordBreak: "keep-all",
                  outline: "none",
                  border: "0px solid transparent",
                }}
              />
            </Stack>
          </Stack>
          <Stack alignItems="flex-end" width="100%">
            <Button
              variant="contained"
              disableRipple
              sx={{
                color: "gray",
                backgroundColor: "#ECD8A4",
                ":hover": { backgroundColor: "#ffe900" },
              }}>
              발행
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default WriteModal;
