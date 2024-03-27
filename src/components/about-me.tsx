import React from "react";
import styled from "styled-components";

import Tabbed from "./tabbed";
import backgroundImage from "./pic.jpg";

const BackgroundDiv = styled.div`
  position: relative;
  z-index: 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // background-image: url(${backgroundImage}); //TODO: fix the pic
    background-size: contain;
    background-position: right;
    opacity: 0.5;
    z-index: -1;
    background-repeat: no-repeat;
  }
`;

const AboutMe: React.FC = () => {
  return (
    <Tabbed className="tabbed-content" tabSize={1}>
      <BackgroundDiv>
        <pre className="code">&lt;h1&gt;</pre>
        <h1>Hello, world!</h1>
        <h1 className="grey-text">
          I am <span className="highlight-text">Harmeet Singh</span>,
        </h1>
        <h1 className="grey-text">a JavaScript/frontend developer.</h1>
        <pre className="code">&lt;/h1&gt;</pre>
      </BackgroundDiv>
    </Tabbed>
  );
};

export default AboutMe;
