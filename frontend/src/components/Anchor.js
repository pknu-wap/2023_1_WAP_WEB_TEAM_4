import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { postState } from "../states/writeState";
import { useRecoilState } from "recoil";

const Anchor = () => {
  const [sections, setSections] = useState([]);
  const [post] = useRecoilState(postState);

  useEffect(() => {
    const regex =
      /<h1.*?>(.*?)<\/h1>|<h2.*?>(.*?)<\/h2>|<h3.*?>(.*?)<\/h3>|<h4.*?>(.*?)<\/h4>/gs;
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

  return (
    <Stack
      paddingTop="30px"
      justifyContent="center"
      style={{
        height: "100%",
        position: "fixed",
        top: 0,
        right: 100,
      }}>
      {sections.map((section, i) => {
        if (section?.html.startsWith("<h1")) {
          return (
            <Stack
              fontWeight="bold"
              ref={section.ref}
              id={section.id}
              fontSize="18px"
              color="background.color"
              height="35px"
              sx={{ cursor: "pointer" }}>
              {section.content}
            </Stack>
          );
        } else if (section?.html.startsWith("<h2")) {
          return (
            <Stack
              fontSize="16px"
              color="primary.500"
              ref={section.ref}
              id={section.id}
              paddingLeft="10px"
              height="30px"
              sx={{ cursor: "pointer" }}>
              {section.content}
            </Stack>
          );
        } else if (section?.html.startsWith("<h3")) {
          return (
            <Stack
              fontSize="16px"
              color="background.color"
              ref={section.ref}
              id={section.id}
              paddingLeft="10px"
              height="30px"
              sx={{ cursor: "pointer" }}>
              {section.content}
            </Stack>
          );
        } else return null;
      })}
    </Stack>
  );
};

export default Anchor;
