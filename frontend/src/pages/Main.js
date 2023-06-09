import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import HeaderMobile from "../components/HeaderMobile";
import SideNavigation from "../components/SideNavigation";
import Post from "../components/Post";
import { Button, IconButton, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRecoilState } from "recoil";
import ReactMarkdown from "react-markdown";
import { isNavigateOpenState } from "../states/mainState";
import { useMutation, useQueryClient } from "react-query";
import {
  PostCategoryCreateApi,
  useGetCategoryQuery,
} from "../apis/api/category-api";
import {
  PostDeleteApi,
  PostPlusLikesApi,
  useGetContentReadQuery,
  useGetHomeQuery,
} from "../apis/api/content-api";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { memberIdState } from "../states/loginState";
import { loadingState, modifyState, visitIdState } from "../states/common";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import Fade from "react-reveal/Fade";

const Main = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isPhone = useMediaQuery(theme.breakpoints.down("xs"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDeskop = useMediaQuery(theme.breakpoints.up("lg"));
  const [isNavigateOpen, setIsNavigateOpen] =
    useRecoilState(isNavigateOpenState);
  const [navigateWidth, setNavigateWidth] = useState(0);
  const [anchorWidth, setAnchoreWidth] = useState(0);
  const [memberId, setMemberId] = useRecoilState(memberIdState);
  const [visitId, setVisitId] = useRecoilState(visitIdState);
  const [modify, setModify] = useRecoilState(modifyState);
  const [loading, setLoading] = useRecoilState(loadingState);

  const queryClient = useQueryClient();

  useEffect(() => {
    isNavigateOpen ? setNavigateWidth(180) : setNavigateWidth(0);
    isDeskop ? setAnchoreWidth(300) : setAnchoreWidth(0);
  }, [isNavigateOpen, isDeskop]);

  useEffect(() => {
    !visitId && !memberId && navigate("/login");
  }, []);

  const postCategoryCreate = useMutation(PostCategoryCreateApi, {
    onSuccess: () => queryClient.invalidateQueries("CategoryRead"),
  });

  const postContentDeleteQuery = useMutation(PostDeleteApi, {
    onSuccess: () => queryClient.invalidateQueries("ContentRead"),
  });

  const postContentLikeQuery = useMutation(PostPlusLikesApi, {
    onSuccess: () => queryClient.invalidateQueries("ContentRead"),
  });

  // 컨텐츠 클릭하면 그거 값 읽어옴
  const { data: contentData, isLoading } = useGetContentReadQuery({
    cid: visitId,
  });

  if (isLoading) {
    setLoading(true);
  } else {
    setLoading(false);
  }

  return (
    <Layout isMain={true}>
      {(visitId || memberId) && isNavigateOpen && (
        <SideNavigation
          clickId={visitId}
          setClickId={setVisitId}
          contentData={contentData}
          isLoading={isLoading}
        />
      )}
      {(visitId || memberId) && contentData ? (
        contentData?.memberDTO?.memberId !== memberId &&
        contentData.contentDTO.isPrivate === 0 ? (
          <Stack
            margin={`0px 0px 84px ${40 + navigateWidth}px`}
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
            sx={{ color: theme.palette.background.color }}>
            비공개인 게시글입니다.
          </Stack>
        ) : (
          <Stack
            margin={`0px 40px 84px ${40 + navigateWidth}px`}
            width="100%"
            height="100%"
            p={isTablet ? "36px 0px" : "36px 160px"}
            color="white">
            <Fade spy={contentData}>
              <Stack>
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
                        작성자 : {contentData?.memberDTO?.nickname}
                      </Stack>
                    )}
                    {!isPhone && (
                      <Stack
                        color="background.color"
                        fontSize="12px"
                        justifyContent="center">
                        조회수 {contentData?.contentDTO?.views}
                      </Stack>
                    )}
                    {!isPhone && (
                      <Stack
                        fontSize="12px"
                        color="background.color"
                        justifyContent="center">
                        추천수 {contentData?.contentDTO?.likes}
                      </Stack>
                    )}
                    {!isPhone && memberId ? (
                      <IconButton
                        onClick={() => {
                          const formData = new FormData();
                          formData.append("loginedMemberId", memberId);
                          formData.append("contentId", visitId);

                          postContentLikeQuery.mutate(formData);
                        }}
                        fontSize="12px"
                        color="background.color"
                        justifyContent="center">
                        <ThumbUpAltIcon />
                      </IconButton>
                    ) : null}

                    {contentData?.memberDTO?.memberId === memberId && (
                      <>
                        <Button
                          onClick={() => {
                            navigate("/write");
                            setModify(true);
                          }}>
                          수정
                        </Button>
                        <Button
                          color="error"
                          onClick={() => {
                            const formData = new FormData();

                            formData.append("loginedMemberId", memberId);
                            formData.append("contentId", visitId);

                            postContentDeleteQuery.mutate(formData);

                            setVisitId(0);
                          }}>
                          삭제
                        </Button>
                      </>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </Fade>

            <Stack height="2px" bgcolor="primary.500" marginBottom="24px" />
            <Fade spy={contentData}>
              <Stack>
                <Stack
                  sx={{
                    color: "background.color",
                  }}
                  gap="5px">
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
                    {contentData?.contentDTO?.text}
                  </ReactMarkdown>
                </Stack>
              </Stack>
            </Fade>
          </Stack>
        )
      ) : null}
    </Layout>
  );
};

export default Main;
