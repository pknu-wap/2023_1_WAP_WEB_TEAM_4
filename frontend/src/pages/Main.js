import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import HeaderMobile from "../components/HeaderMobile";
import SideNavigation from "../components/SideNavigation";
import Post from "../components/Post";
import { Button, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRecoilState } from "recoil";
import ReactMarkdown from "react-markdown";
import { isNavigateOpenState } from "../states/mainState";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
import { postState, titleState } from "../states/writeState";
import { useMutation, useQueryClient } from "react-query";
import {
  PostCategoryCreateApi,
  useGetCategoryQuery,
} from "../apis/api/category-api";
import { PostDeleteApi, useGetContentReadQuery } from "../apis/api/content-api";
import Layout from "../components/Layout";

const Main = () => {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("xs"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDeskop = useMediaQuery(theme.breakpoints.up("lg"));
  const [isNavigateOpen, setIsNavigateOpen] =
    useRecoilState(isNavigateOpenState);
  const [navigateWidth, setNavigateWidth] = useState(0);
  const [anchorWidth, setAnchoreWidth] = useState(0);

  const [post] = useRecoilState(postState);
  const [title] = useRecoilState(titleState);

  const queryClient = useQueryClient();

  useEffect(() => {
    isNavigateOpen ? setNavigateWidth(180) : setNavigateWidth(0);
    isDeskop ? setAnchoreWidth(300) : setAnchoreWidth(0);
  }, [isNavigateOpen, isDeskop]);
  const [clickId, setClickId] = useState(10);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const regex = /^#+\s*(.*?)$/gm;
    const matches = [...post.matchAll(regex)];
    const newSections = matches.map((match, index) => ({
      id: `section-${index + 1}`,
      html: match[0] || "",
      content: match[4] || match[3] || match[2] || match[1] || "",
      isActive: false,
      ref: React.createRef(),
    }));
    setSections(newSections);
  }, []);

  const handleClick = (sectionId) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, isActive: true }
          : { ...section, isActive: false }
      )
    );
    const selectedSection = sections.find(
      (section) => section.id === sectionId
    );
    selectedSection?.ref?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { data } = useGetCategoryQuery();

  const postCategoryCreate = useMutation(PostCategoryCreateApi, {
    onSuccess: () => queryClient.invalidateQueries("CategoryRead"),
  });

  const postContentDeleteQuery = useMutation(PostDeleteApi, {
    onSuccess: () => queryClient.invalidateQueries("ContentRead"),
  });

  const { data: contentData } = useGetContentReadQuery({ cid: clickId });

  return (
    <Layout isMain={true}>
      {isNavigateOpen && <SideNavigation setClickId={setClickId} />}
      <Stack
        margin={`0px ${40 + anchorWidth}px 84px ${40 + navigateWidth}px`}
        width="100%"
        height="100%"
        p={isTablet ? "36px 0px" : "36px 160px"}
        color="white">
        {title && (
          <Stack>
            <Button
              onClick={() => {
                postCategoryCreate.mutate("asdfff");
              }}>
              카테고리 추가
            </Button>
            <Stack direction="row" justifyContent="space-between">
              <Stack
                color="background.color"
                fontSize="32px"
                height="45px"
                fontWeight="bold">
                {contentData?.contentDTO?.title}
              </Stack>
              <Stack direction="row" gap={isPhone ? "0px" : "12px"}>
                {!isPhone && (
                  <Stack
                    color="background.color"
                    fontSize="12px"
                    justifyContent="center">
                    조회수 2
                  </Stack>
                )}
                {!isPhone && (
                  <Stack
                    fontSize="12px"
                    color="background.color"
                    justifyContent="center">
                    추천수 3
                  </Stack>
                )}
                <Button>수정</Button>
                <Button color="error">삭제</Button>
              </Stack>
            </Stack>
            <Stack height="2px" bgcolor="primary.500" marginBottom="24px" />
            <Stack>
              <Stack
                sx={{
                  color: "background.color",
                }}
                gap="5px">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    br: ({ node, ...props }) => (
                      <div
                        {...props}
                        style={{ height: "10px", color: "transparent" }}
                      />
                    ),
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
                    h4: ({ node, children, ...props }) => {
                      return (
                        <h4 style={{ margin: 0 }} {...props}>
                          {children}
                        </h4>
                      );
                    },
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
                  {contentData?.contentDTO?.text}
                </ReactMarkdown>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
      {isDeskop && (
        <Stack
          marginTop="14%"
          justifyContent="center"
          overflow="scroll"
          style={{
            maxHeight: "400px",
            height: "100%",
            maxWidth: "200px",
            width: "100%",
            position: "fixed",
            top: 0,
            right: 100,
          }}>
          {sections.map((section, i) => {
            if (section?.html.startsWith("###")) {
              return (
                <Stack
                  key={i}
                  fontSize="16px"
                  color="background.color"
                  paddingLeft="15px"
                  height="30px"
                  onClick={() => handleClick(section.id)}
                  sx={{ cursor: "pointer" }}>
                  {section.content}
                </Stack>
              );
            } else if (section?.html.startsWith("##")) {
              return (
                <Stack
                  key={i}
                  fontSize="16px"
                  color="primary.500"
                  position="relative"
                  paddingLeft="10px"
                  height="30px"
                  onClick={() => handleClick(section.id)}
                  sx={{ cursor: "pointer" }}>
                  {section.content}
                </Stack>
              );
            } else if (section?.html.startsWith("#")) {
              return (
                <Stack
                  key={i}
                  fontWeight="bold"
                  position="relative"
                  fontSize="18px"
                  color="background.color"
                  height="35px"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    handleClick(section.id);
                    console.log("클릭");
                  }}>
                  {section.content}
                </Stack>
              );
            } else return null;
          })}
        </Stack>
      )}
    </Layout>
  );
};

export default Main;
