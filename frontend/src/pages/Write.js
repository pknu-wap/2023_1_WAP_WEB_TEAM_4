import React, { useState } from "react";
import { Stack, Chip, Button, Snackbar, Alert } from "@mui/material";
import { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import CancelIcon from "@mui/icons-material/Cancel";
import "@toast-ui/editor/dist/i18n/ko-kr";
import WriteModal from "../components/WriteModal";
import Header from "../components/Header";
import { gray, mint } from "../static/style/color";

const Write = () => {
  const editorRef = useRef();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tagArray, setTagArray] = useState([]);
  const [tag, setTag] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  // 등록 버튼 핸들러
  const handleRegisterButton = () => {
    // 입력창에 입력한 내용을 HTML 태그 형태로 취득
    console.log(editorRef.current?.getInstance().getHTML());

    setDialogOpen(true);
  };

  const textChange = () => {
    setText(editorRef.current.getInstance().getHTML());
  };

  return (
    <Stack height="100%">
      <Header />
      <Stack height="5000px" paddingTop="60px" width="100%" direction="row">
        <Stack
          spacing={2}
          padding="60px 96px 40px 96px"
          direction="column"
          width="100%">
          <input
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            style={{
              color: "black",
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
            <Stack spacing={1} maxWidth="100px" color="white" direction="row">
              {tagArray.map((tag, i) => (
                <Chip
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    border: `1px solid ${mint[400]}`,
                    backgroundColor: mint[200],
                    "& .MuiChip-deleteIcon": {
                      color: "#F3F4F6",
                      ":hover": {
                        color: gray[100],
                      },
                      ":active": {
                        color: gray[200],
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
              ))}
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
                        setToastMessage("태그에 `#`은 포함될 수 없습니다.");
                      }
                    } else {
                      setTag("");
                      setSnackbarOpen(true);
                      setToastMessage("태그는 최대 10개까지 지정 가능합니다.");
                    }
                  }
                }}
                style={{
                  color: "black",
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
                  color: "#4D999D",
                  ":hover": {
                    color: "#0c3941",
                    backgroundColor: "transparent",
                  },
                  ":active": { color: "#4D999D" },
                }}
                width="fit-content">
                원본
              </Button>
              <Button
                variant="contained"
                sx={{
                  color: "white",
                  backgroundColor: "#4D999D",
                  ":hover": {
                    backgroundColor: "#0c3941",
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
              // theme="dark"
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
          setText={setText}
        />
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}>
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="error"
            variant=""
            sx={{ width: "100%", backgroundColor: "red" }}>
            {toastMessage}
          </Alert>
        </Snackbar>
      </Stack>
    </Stack>
  );
};

export default Write;
