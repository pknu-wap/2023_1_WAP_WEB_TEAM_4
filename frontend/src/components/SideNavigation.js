import { IconButton, Stack, useMediaQuery } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useRecoilState } from "recoil";
import { isNavigateOpenState } from "../states/mainState";
import { useTheme } from "@mui/material/styles";
import {
  useGetContentReadQuery,
  useGetHomeQuery,
} from "../apis/api/content-api";
import { memberIdState } from "../states/loginState";

const SideNavigation = ({ clickId, setClickId }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isNavigateOpen, setIsNavigateOpen] =
    useRecoilState(isNavigateOpenState);
  const [memberId, setMemberId] = useRecoilState(memberIdState);

  const isPhone = useMediaQuery(theme.breakpoints.down("xs"));

  const { data: contentData } = useGetContentReadQuery({ cid: clickId });
  const { data: homeData } = useGetHomeQuery({ memberId: memberId });

  return (
    <Stack
      boxShadow="0px 0px 1px"
      backgroundColor="sideNavigation.background"
      height="100%"
      maxWidth={!isPhone ? "180px" : undefined}
      width="100%"
      p="12px 10px 0px 0px"
      left={0}
      zIndex={100}
      position="fixed">
      <Stack p="0px 20px 20px 20px">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Stack direction="row" alignItems="center" marginBottom="5px">
            <IconButton
              width="16px"
              height="16px"
              onClick={() => navigate("/write")}>
              <AddIcon />
            </IconButton>
            <Stack
              sx={{
                color: "background.color",
                fontSize: "16px",
                fontWeight: "bold",
              }}>
              글쓰기
            </Stack>
          </Stack>
          <IconButton onClick={() => setIsNavigateOpen(false)}>
            <KeyboardDoubleArrowLeftIcon />
          </IconButton>
        </Stack>
        <Stack gap="16px">
          <Stack gap="10px">
            <Stack>
              {contentData
                ? contentData?.sidebar?.map((category, i) => {
                    return (
                      <>
                        <Stack
                          key={i}
                          fontSize="18px"
                          color="sideNavigation.pointColorTitle"
                          height="30px"
                          paddingLeft="10px"
                          marginBottom="5px"
                          justifyContent="center"
                          fontWeight="bold">
                          {category?.category_name}
                        </Stack>
                        <Stack marginBottom="10px">
                          {category?.titles.map((title, index) => {
                            return (
                              <Stack
                                key={index}
                                justifyContent="center"
                                borderRadius="4px"
                                sx={{
                                  ":hover": {
                                    backgroundColor: "sideNavigation.hover",
                                  },
                                  ":active": {
                                    backgroundColor: "sideNavigation.active",
                                  },
                                  cursor: "pointer",
                                }}
                                fontSize="16px"
                                padding="0px 0px 5px 20px"
                                color={
                                  clickId === title.contentId
                                    ? "sideNavigation.pointColorContent"
                                    : "white"
                                }
                                onClick={() => setClickId(title?.contentId)}
                                height="25px">
                                - {title.title}
                              </Stack>
                            );
                          })}
                        </Stack>
                      </>
                    );
                  })
                : homeData?.map((category, i) => {
                    return (
                      <>
                        <Stack
                          key={i}
                          fontSize="18px"
                          color="sideNavigation.pointColorTitle"
                          height="30px"
                          paddingLeft="10px"
                          marginBottom="5px"
                          justifyContent="center"
                          fontWeight="bold">
                          {category?.category_name}
                        </Stack>
                        <Stack marginBottom="10px">
                          {category?.titles.map((title, index) => {
                            return (
                              <Stack
                                key={index}
                                justifyContent="center"
                                borderRadius="4px"
                                sx={{
                                  ":hover": {
                                    backgroundColor: "sideNavigation.hover",
                                  },
                                  ":active": {
                                    backgroundColor: "sideNavigation.active",
                                  },
                                  cursor: "pointer",
                                }}
                                fontSize="16px"
                                padding="0px 0px 5px 20px"
                                color={
                                  clickId === title.contentId
                                    ? "sideNavigation.pointColorContent"
                                    : "white"
                                }
                                onClick={() => setClickId(title?.contentId)}
                                height="25px">
                                - {title.title}
                              </Stack>
                            );
                          })}
                        </Stack>
                      </>
                    );
                  })}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SideNavigation;
