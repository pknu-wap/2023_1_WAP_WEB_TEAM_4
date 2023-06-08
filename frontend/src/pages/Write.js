import React, { useState } from "react";
import {
  Stack,
  Chip,
  Button,
  Snackbar,
  Alert,
  TextareaAutosize,
  ButtonGroup,
} from "@mui/material";
import { useRef } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import WriteModal from "../components/WriteModal";
import Header from "../components/Header";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "@mui/material/styles";
import { useRecoilState } from "recoil";
import "./write.css";
import ReactMarkdown from "react-markdown";
import CodeIcon from "@mui/icons-material/Code";
import ImageIcon from "@mui/icons-material/Image";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useMutation, useQueryClient } from "react-query";
import { PostCreateApi } from "../apis/api/content-api";
import { useNavigate } from "react-router-dom";
import { useGetCategoryQuery } from "../apis/api/category-api";
import Layout from "../components/Layout";
import { memberIdState } from "../states/loginState";

const Write = () => {
  const queryClient = useQueryClient();
  const [memberId, setMemberId] = useRecoilState(memberIdState);
  const editorRef = useRef();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [tagArray, setTagArray] = useState([]);
  const [tag, setTag] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isHover, setIsHover] = useState(false);
  const textareaRef = useRef(null);

  const theme = useTheme();
  // 등록 버튼 핸들러
  const handleRegisterButton = () => {
    // 입력창에 입력한 내용을 HTML 태그 형태로 취득
    setDialogOpen(true);
  };

  const { data } = useGetCategoryQuery({
    loginedMemberId: memberId,
  });

  return (
    <Layout>
      <Stack
        gap="12px"
        bgcolor="background.main"
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
          height="fit-content"
          justifyContent="space-between"
          direction="row">
          <Stack
            spacing={1}
            width="100%"
            flexWrap="wrap"
            gap="4px"
            color="white"
            direction="row">
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
        <Stack minHeight="550px" overflow="auto">
          <Stack direction="row" gap="8px">
            <ButtonGroup sx={{ marginBottom: "8px" }}>
              <Button
                onClick={() => {
                  setPost(post + "\n# ");
                  textareaRef.current.focus();
                }}>
                H1
              </Button>
              <Button
                onClick={() => {
                  setPost(post + "\n## ");
                  textareaRef.current.focus();
                }}>
                H2
              </Button>
              <Button
                onClick={() => {
                  setPost(post + "\n### ");
                  textareaRef.current.focus();
                }}>
                H3
              </Button>
              <Button
                onClick={() => {
                  setPost(post + "\n#### ");
                  textareaRef.current.focus();
                }}>
                H4
              </Button>
            </ButtonGroup>
            <ButtonGroup sx={{ marginBottom: "8px" }}>
              <Button
                onClick={() => {
                  setPost(post + "\n* *");
                  textareaRef.current.focus();
                }}
                sx={{ fontWeight: "bold" }}>
                B
              </Button>
              <Button
                onClick={() => {
                  const position = textareaRef.current.value.length + 3;
                  setPost(post + "\n**");
                  // textareaRef.current.focus();
                  // textareaRef.current.setSelectionRange(position, position);
                  setTimeout(() => {
                    textareaRef.current.focus();
                    textareaRef.current.setSelectionRange(position, position);
                  }, 0);
                }}
                sx={{ fontStyle: "italic" }}>
                I
              </Button>
              <Button
                onClick={() => {
                  setPost(post + "\n> ");
                  textareaRef.current.focus();
                }}>
                &gt;
              </Button>
            </ButtonGroup>
            <ButtonGroup sx={{ marginBottom: "8px" }}>
              <Button
                onClick={() => {
                  setPost(post + "\n```\n\n```");
                  textareaRef.current.focus();
                }}>
                <CodeIcon />
              </Button>
              <Button
                onClick={() => {
                  setPost(post + "\\\n");
                  textareaRef.current.focus();
                }}>
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
                ref={textareaRef}
                value={post}
                style={{
                  resize: "none",
                  minHeight: "70%",
                  color: theme.palette.background.color,
                  backgroundColor: "transparent",
                  border: isHover
                    ? `1px solid ${theme.palette.primary.main}`
                    : `1px solid ${theme.palette.primary.main}`,
                }}
                onChange={(e) => setPost(e.target.value)}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
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
        data={data}
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
    </Layout>
  );
};

export default Write;
