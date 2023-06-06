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
import { postState, titleState } from "../states/writeState";
import { useMutation, useQueryClient } from "react-query";
import {
  PostCategoryCreateApi,
  useGetCategoryQuery,
} from "../apis/api/category-api";
import {
  PostDeleteApi,
  useGetContentReadQuery,
  useGetHomeQuery,
} from "../apis/api/content-api";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("xs"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDeskop = useMediaQuery(theme.breakpoints.up("lg"));
  const [isNavigateOpen, setIsNavigateOpen] =
    useRecoilState(isNavigateOpenState);
  const [navigateWidth, setNavigateWidth] = useState(0);
  const [anchorWidth, setAnchoreWidth] = useState(0);

  const [title] = useRecoilState(titleState);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(sessionStorage.getItem("memberId"));
  //   !sessionStorage.getItem("memberId") && navigate("/login");
  // }, []);

  useEffect(() => {
    isNavigateOpen ? setNavigateWidth(180) : setNavigateWidth(0);
    isDeskop ? setAnchoreWidth(300) : setAnchoreWidth(0);
  }, [isNavigateOpen, isDeskop]);

  const [clickId, setClickId] = useState(undefined);

  const postCategoryCreate = useMutation(PostCategoryCreateApi, {
    onSuccess: () => queryClient.invalidateQueries("CategoryRead"),
  });

  const postContentDeleteQuery = useMutation(PostDeleteApi, {
    onSuccess: () => queryClient.invalidateQueries("ContentRead"),
  });

  // 컨텐츠 클릭하면 그거 값 읽어옴
  const { data: contentData } = useGetContentReadQuery({ cid: clickId });

  return (
    <Layout isMain={true}>
      {isNavigateOpen && (
        <SideNavigation clickId={clickId} setClickId={setClickId} />
      )}
      <Stack
        margin={`0px ${40 + anchorWidth}px 84px ${40 + navigateWidth}px`}
        width="100%"
        height="100%"
        p={isTablet ? "36px 0px" : "36px 160px"}
        color="white">
        {title && (
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
                <Button>수정</Button>
                <Button
                  color="error"
                  onClick={() => postContentDeleteQuery.mutate(clickId)}>
                  삭제
                </Button>
              </Stack>
            </Stack>

            <Stack height="2px" bgcolor="primary.500" marginBottom="24px" />
            <Stack>
              <Stack
                sx={{
                  color: "background.color",
                }}
                gap="5px">
                {contentData?.contentDTO?.text}
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
          }}></Stack>
      )}
    </Layout>
  );
};

export default Main;
