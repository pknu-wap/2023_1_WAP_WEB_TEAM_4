import React, { useState, useRef, useEffect } from "react";

function App() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const content =
      //   "<p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4>";
      "<p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4><p>p  태그 입니다.</p><h1>H1 입니다.</h1><h2>H2 입니다.</h2><h3>H3 입니다.</h3><h4>H4입니다.</h4>";

    const regex =
      /<h1.*?>(.*?)<\/h1>|<h2.*?>(.*?)<\/h2>|<h3.*?>(.*?)<\/h3>|<h4.*?>(.*?)<\/h4>/gs;
    const matches = [...content.matchAll(regex)];
    const newSections = matches.map((match, index) => ({
      id: `section-${index + 1}`,
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
    console.log(sectionId);
    // sectionRef.current.scrollIntoView({ behavior: "smooth" });
    const selectedSection = sections.find((section) => {
      console.log(section.id);
      console.log(sectionId);
      return section.id === sectionId;
    });
    console.log(selectedSection);
    if (selectedSection && selectedSection.ref) {
      selectedSection.ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        {sections.map((section) => (
          <div>
            <div
              style={{ backgroundColor: "red" }}
              className={`sidebar-element ${section.isActive ? "active" : ""}`}
              onClick={() => handleClick(section.id)}>
              {section.content}
            </div>
            <h1 ref={section.ref} id={section.id}>
              {section.content}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
