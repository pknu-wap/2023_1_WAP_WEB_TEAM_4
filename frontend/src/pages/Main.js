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
import { visitIdState } from "../states/common";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
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
  const { data: contentData } = useGetContentReadQuery({ cid: visitId });

  return (
    <Layout isMain={true}>
      {(visitId || memberId) && isNavigateOpen && (
        <SideNavigation clickId={visitId} setClickId={setVisitId} />
      )}
      {(visitId || memberId) && contentData ? (
        <Stack
          margin={`0px 0px 84px ${40 + navigateWidth}px`}
          width="100%"
          height="100%"
          p={isTablet ? "36px 0px" : "36px 160px"}
          color="white">
          <Fade spy={contentData}>
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

                {visitId === 0 && (
                  <>
                    <Button>수정</Button>
                    <Button
                      color="error"
                      onClick={() =>
                        postContentDeleteQuery.mutate({
                          loginedMemberId: memberId,
                          contentId: visitId,
                        })
                      }>
                      삭제
                    </Button>
                  </>
                )}
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
                {contentData?.contentDTO?.text}
              </Stack>
            </Stack>
          </Fade>
        </Stack>
      ) : null}
    </Layout>
  );
};

export default Main;
