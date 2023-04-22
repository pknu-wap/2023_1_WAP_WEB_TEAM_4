// import { Stack } from "@mui/material";
// import React, { useEffect } from "react";
// import { postState, sectionsState } from "../states/writeState";
// import { useRecoilState } from "recoil";

// const Anchor = () => {
//   const [sections, setSections] = useRecoilState(sectionsState);
//   const [post] = useRecoilState(postState);

//   useEffect(() => {
//     const regex =
//       /<h1.*?>(.*?)<\/h1>|<h2.*?>(.*?)<\/h2>|<h3.*?>(.*?)<\/h3>|<h4.*?>(.*?)<\/h4>/gs;
//     const matches = [...post.matchAll(regex)];
//     const newSections = matches.map((match, index) => ({
//       id: `section-${index + 1}`,
//       html: match[0] || "",
//       content: match[4] || match[3] || match[2] || match[1] || "",
//       isActive: false,
//       ref: React.createRef(),
//     }));
//     setSections(newSections);
//   }, []);

//   const handleClick = (sectionId) => {
//     setSections(
//       sections.map((section) =>
//         section.id === sectionId
//           ? { ...section, isActive: true }
//           : { ...section, isActive: false }
//       )
//     );
//     const selectedSection = sections.find(
//       (section) => section.id === sectionId
//     );
//     console.log(selectedSection);
//     selectedSection?.ref?.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (

//   );
// };

// export default Anchor;
