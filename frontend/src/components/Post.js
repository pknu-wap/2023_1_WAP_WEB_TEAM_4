import { Button, Stack, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useRecoilState } from "recoil";
import { postState, titleState } from "../states/writeState";
import { useTheme } from "@mui/material/styles";

const Post = () => {
  const themes = useTheme();

  const [post] = useRecoilState(postState);
  const [title] = useRecoilState(titleState);

  const [sections, setSections] = useState([]);

  const isNotLarge = useMediaQuery(themes.breakpoints.down("lg"));
  useEffect(() => {
    const regex =
      /<h1.*?>(.*?)<\/h1>|<h2.*?>(.*?)<\/h2>|<h3.*?>(.*?)<\/h3>|<h4.*?>(.*?)<\/h4>|<p.*?>(.*?)<\/p>|<div.*?>(.*?)<\/div>/gs;
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
    console.log(selectedSection);
    selectedSection?.ref?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Stack
      alignItems="center"
      bgcolor="background.main"
      width="100%"
      padding="56px 40px 84px 254px"
    >
      <Stack
        marginRight="100px"
        alignItems="flex-start"
        width="850px"
        marginTop="80px"
        justifyContent="center"
      >
        {title && (
          <Stack>
            <Stack direction="row" justifyContent="space-between">
              <Stack
                color="background.color"
                fontSize="32px"
                height="45px"
                fontWeight="bold"
              >
                {title}
              </Stack>
              <Stack direction="row">
                <Button>수정</Button>
                <Button color="error">삭제</Button>
              </Stack>
            </Stack>
            <Stack
              width="850px"
              height="2px"
              bgcolor="primary.500"
              marginBottom="24px"
            />
            <Stack>
              <Stack
                sx={{
                  margin: "0px",
                  color: "background.color",
                }}
                gap="5px"
              >
                {sections.map((section, index) => {
                  return (
                    <Stack key={index} id={section.id} ref={section.ref}>
                      {ReactHtmlParser(section.html, {
                        transform: (node, index) => {
                          if (node.type === "tag") {
                            node.attribs = {
                              ...node.attribs,
                              id: "",
                              style: "margin: 0;",
                            };
                          }
                        },
                      })}
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
      {!isNotLarge && (
        <Stack
          paddingTop="30px"
          justifyContent="center"
          style={{
            height: "100%",
            width: "200px",
            position: "fixed",
            top: 0,
            right: 100,
          }}
        >
          {sections.map((section, i) => {
            if (section?.html.startsWith("<h1")) {
              return (
                <Stack
                  fontWeight="bold"
                  position="relative"
                  fontSize="18px"
                  color="background.color"
                  height="35px"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    handleClick(section.id);
                    console.log("클릭");
                  }}
                >
                  {section.content}
                </Stack>
              );
            } else if (section?.html.startsWith("<h2")) {
              return (
                <Stack
                  fontSize="16px"
                  color="primary.500"
                  position="relative"
                  paddingLeft="10px"
                  height="30px"
                  onClick={() => handleClick(section.id)}
                  sx={{ cursor: "pointer" }}
                >
                  {section.content}
                </Stack>
              );
            } else if (section?.html.startsWith("<h3")) {
              return (
                <Stack
                  fontSize="16px"
                  color="background.color"
                  paddingLeft="10px"
                  height="30px"
                  onClick={() => handleClick(section.id)}
                  sx={{ cursor: "pointer" }}
                >
                  {section.content}
                </Stack>
              );
            } else return null;
          })}
        </Stack>
      )}
    </Stack>
  );
};

export default Post;
