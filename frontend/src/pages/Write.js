import React, { useState } from "react";
import {
  Stack,
  Chip,
  Button,
  Snackbar,
  Alert,
  TextareaAutosize,
  ButtonGroup,
  IconButton,
} from "@mui/material";
import { useRef } from "react";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import CancelIcon from "@mui/icons-material/Cancel";
import "@toast-ui/editor/dist/i18n/ko-kr";
import WriteModal from "../components/WriteModal";
import Header from "../components/Header";
import { useTheme } from "@mui/material/styles";
import { postState, titleState } from "../states/writeState";
import { useRecoilState } from "recoil";
import "./write.css";
import ReactMarkdown from "react-markdown";
import CodeIcon from "@mui/icons-material/Code";
import ImageIcon from "@mui/icons-material/Image";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

const Write = () => {
  const editorRef = useRef();
  const [title, setTitle] = useRecoilState(titleState);
  const [post, setPost] = useRecoilState(postState);
  const [tagArray, setTagArray] = useState([]);
  const [tag, setTag] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isHover, setIsHover] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const theme = useTheme();
  // 등록 버튼 핸들러
  const handleRegisterButton = () => {
    // 입력창에 입력한 내용을 HTML 태그 형태로 취득
    console.log(editorRef.current?.getInstance().getHTML());

    setDialogOpen(true);
  };

  return (
    <Stack height="100%">
      <Header />
      <Stack height="5000px" paddingTop="60px" width="100%" direction="row">
        <Stack
          bgcolor="background.main"
          spacing={2}
          padding="48px 96px 40px 96px"
          direction="column"
          width="100%">
          <input
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            style={{
              color: theme.palette.background.color,
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
                    color: "background.color",
                    fontWeight: "bold",
                    border: `1px solid ${theme.palette.primary[400]}`,
                    backgroundColor: "transparent",
                    "& .MuiChip-deleteIcon": {
                      color: "primary.500",
                      ":hover": {
                        color: "primary.600",
                      },
                      ":active": {
                        color: "primary.700",
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
                  color: theme.palette.background.color,
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
                  color: "primary.300",
                  ":hover": {
                    color: "primary.500",
                    backgroundColor: "transparent",
                  },
                  ":active": { color: "primary.700" },
                }}
                width="fit-content">
                원본
              </Button>
              <Button
                variant="contained"
                sx={{
                  color: "background.contractColor",
                  backgroundColor: "primary.500",
                  ":hover": {
                    backgroundColor: "primary.600",
                  },
                  ":active": { backgroundColor: "primary.700" },
                }}
                onClick={handleRegisterButton}
                width="fit-content">
                저장
              </Button>
            </Stack>
          </Stack>
          <Stack minHeight="550px" overflow="auto">
            <Stack direction="row" gap="8px">
              <ButtonGroup sx={{ marginBottom: "8px" }}>
                <Button>H1</Button>
                <Button>H2</Button>
                <Button>H3</Button>
                <Button>H4</Button>
              </ButtonGroup>
              <ButtonGroup sx={{ marginBottom: "8px" }}>
                <Button sx={{ fontWeight: "bold" }}>B</Button>
                <Button sx={{ fontStyle: "italic" }}>I</Button>
                <Button sx={{ fontWeight: "bold" }}> &gt;</Button>
              </ButtonGroup>
              <ButtonGroup sx={{ marginBottom: "8px" }}>
                <Button>
                  <CodeIcon />
                </Button>
                <Button>
                  <ImageIcon />
                </Button>
                <Button>
                  <KeyboardReturnIcon />
                </Button>
              </ButtonGroup>
            </Stack>
            <Stack direction="row">
              <Stack
                sx={{
                  minHeight: "500px",
                  width: "50%",
                }}>
                <TextareaAutosize
                  value={post}
                  style={{
                    resize: "none",
                    minHeight: "70%",
                    color: theme.palette.background.color,
                    backgroundColor: "transparent",
                    border: isHover
                      ? `1px solid ${theme.palette.primary.main}`
                      : isFocus
                      ? `1px solid ${theme.palette.primary.main}`
                      : `1px solid ${theme.palette.primary.main}`,
                  }}
                  onChange={(e) => setPost(e.target.value)}
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                />
              </Stack>

              <Stack
                width="40%"
                bgcolor="background.main"
                color="background.color"
                paddingLeft="10%"
                alignItems="left">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    br: ({ node, ...props }) => <br />,
                    h1: ({ node, children, ...props }) => (
                      <h1 style={{ margin: 0 }} {...props}>
                        {children}
                      </h1>
                    ),
                    h2: ({ node, children, ...props }) => (
                      <h2 style={{ margin: 0 }} {...props}>
                        {children}
                      </h2>
                    ),
                    h3: ({ node, children, ...props }) => (
                      <h3 style={{ margin: 0 }} {...props}>
                        {children}
                      </h3>
                    ),
                    h4: ({ node, children, ...props }) => (
                      <h4 style={{ margin: 0 }} {...props}>
                        {children}
                      </h4>
                    ),
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      console.log(match);
                      return inline ? (
                        // 강조 (``)
                        <code
                          style={{
                            fontWeight: "bold",
                            background:
                              "linear-gradient( to right, var(--sub-highlight-color) 15%, var(--highlight-color) 85%, var(--sub-highlight-color) )",
                            padding: "2px",
                            borderRadius: "3px",
                          }}
                          {...props}>
                          {children}
                        </code>
                      ) : match ? (
                        // 코드 (```)
                        <SyntaxHighlighter
                          style={nord}
                          language={match[1]}
                          PreTag="div"
                          {...props}>
                          {String(children)
                            .replace(/\n$/, "")
                            .replace(/\n&nbsp;\n/g, "")
                            .replace(/\n&nbsp\n/g, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <SyntaxHighlighter
                          style={nord}
                          language="textile"
                          PreTag="div"
                          {...props}>
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      );
                    },
                    // 인용문 (>)
                    blockquote({ node, children, ...props }) {
                      return (
                        <div
                          style={{
                            background: "#f0f0f0",
                            padding: "1px 15px",
                            borderRadius: "10px",
                          }}
                          {...props}>
                          {children}
                        </div>
                      );
                    },
                    img({ node, ...props }) {
                      return (
                        <img
                          style={{ maxWidth: "400px", maxHeight: "300px" }}
                          src={props.src.replace("../../../../public/", "/")}
                          alt="MarkdownRenderer__Image"
                        />
                      );
                    },
                    em({ node, children, ...props }) {
                      return (
                        <span style={{ fontStyle: "italic" }} {...props}>
                          {children}
                        </span>
                      );
                    },
                  }}>
                  {post}
                </ReactMarkdown>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <WriteModal
          title={title}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          tagArray={tagArray}
          text={post}
          setText={setPost}
        />
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}>
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="error"
            variant=""
            sx={{ color: "white", width: "100%", backgroundColor: "red" }}>
            {toastMessage}
          </Alert>
        </Snackbar>
      </Stack>
    </Stack>
  );
};

export default Write;
