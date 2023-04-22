import React, { useState, useEffect } from "react";

function App() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const content =
      "<p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4>";

    const regex =
      /<h1.*?>(.*?)<\/h1>|<h2.*?>(.*?)<\/h2>|<h3.*?>(.*?)<\/h3>|<h4.*?>(.*?)<\/h4>/gs;
    const matches = [...content.matchAll(regex)];
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
    <div>
      <div>
        {sections.map((section) => (
          <div>
            <div
              style={{ backgroundColor: "red" }}
              onClick={() => handleClick(section.id)}>
              {section.content}
            </div>
          </div>
        ))}
        {sections.map((section) => {
          if (section?.html.startsWith("<h1")) {
            return (
              <h1
                style={{ color: section.isActive ? "red" : "black" }}
                ref={section.ref}
                id={section.id}>
                {section.content}
              </h1>
            );
          } else if (section?.html.startsWith("<h2")) {
            return (
              <h2
                style={{ color: section.isActive ? "red" : "black" }}
                ref={section.ref}
                id={section.id}>
                {section.content}
              </h2>
            );
          } else if (section?.html.startsWith("<h3")) {
            return (
              <h3
                style={{ color: section.isActive ? "red" : "black" }}
                ref={section.ref}
                id={section.id}>
                {section.content}
              </h3>
            );
          } else {
            return (
              <p
                style={{ color: section.isActive ? "red" : "black" }}
                ref={section.ref}
                id={section.id}>
                {section.content}
              </p>
            );
          }
        })}
      </div>
    </div>
  );
}

export default App;
