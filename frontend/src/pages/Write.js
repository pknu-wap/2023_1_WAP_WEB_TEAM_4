import React, { useState } from "react";
import { Stack, Chip, Button, Snackbar, Alert, Modal } from "@mui/material";
import { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import CancelIcon from "@mui/icons-material/Cancel";
import "@toast-ui/editor/dist/i18n/ko-kr";
import WriteModal from "../components/WriteModal";

const Write = () => {
  const editorRef = useRef();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tagArray, setTagArray] = useState([]);
  const [tag, setTag] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // 등록 버튼 핸들러
  const handleRegisterButton = () => {
    // 입력창에 입력한 내용을 HTML 태그 형태로 취득
    console.log(editorRef.current?.getInstance().getHTML());
    // 입력창에 입력한 내용을 MarkDown 형태로 취득
    console.log(editorRef.current?.getInstance().getMarkdown());

    setDialogOpen(true);
  };

  const textChange = () => {
    setText(editorRef.current.getInstance().getMarkdown());
  };

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
          direction="column"
          width="100%">
          <input
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            style={{
              color: "white",
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          />
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
              {tagArray.map((tag, i) => {
                return (
                  <Chip
                    sx={{
                      border: "1px solid #ECD8A4",
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
                    deleteIcon={<CancelIcon fontSize="12px" />}
                    onDelete={() =>
                      setTagArray(tagArray.filter((tag, index) => index !== i))
                    }
                  />
                );
              })}
              <input
                placeholder="태그를 입력해주세요"
                value={tag}
                onChange={(event) => {
                  setTag(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.keyCode === 32) {
                    if (tagArray.length <= 10) {
                      if (!tag.includes("#")) {
                        setTagArray([...tagArray, tag]);
                        setTag("");
                      } else {
                        setTag("");
                        setSnackbarOpen(true);
                        return (
                          <Snackbar
                            open={snackbarOpen}
                            autoHideDuration={6000}
                            onClose={() => snackbarOpen(false)}>
                            <Alert
                              onClose={() => snackbarOpen(false)}
                              severity="success"
                              sx={{ width: "100%" }}>
                              태그에 '#'은 포함될 수 없습니다.
                            </Alert>
                          </Snackbar>
                        );
                      }
                    } else {
                      setTag("");
                      setSnackbarOpen(true);
                      return (
                        <Snackbar open={snackbarOpen} autoHideDuration={6000}>
                          <Alert
                            onClose={() => snackbarOpen(false)}
                            severity="success"
                            sx={{ width: "100%" }}>
                            태그의 최대 개수는 10개입니다.
                          </Alert>
                        </Snackbar>
                      );
                    }
                  }
                }}
                style={{
                  color: "white",
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                }}
              />
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
                onClick={handleRegisterButton}
                width="fit-content">
                저장
              </Button>
            </Stack>
          </Stack>
          <Stack minHeight="500px" overflow="auto">
            <Editor
              initialValue=" "
              previewStyle="vertical"
              minHeight="500px"
              height="auto"
              ref={editorRef}
              onChange={textChange}
              hideModeSwitch={true}
              initialEditType="markdown"
              toolbarItems={[
                ["heading", "bold", "italic", "strike"],
                ["hr", "quote"],
                ["ul", "ol", "task"],
                ["table", "image", "link"],
                ["code", "codeblock"],
              ]}
              theme="dark"
              language="ko-KR"
            />
          </Stack>
        </Stack>
        <WriteModal
          title={title}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          tagArray={tagArray}
          text={text}
        />
      </Stack>
    </Stack>
  );
};

export default Write;
