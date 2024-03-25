import React from "react";

import Tabbed from "./tabbed";

const AboutMe: React.FC = () => {
  return (
    <Tabbed className="tabbed-content" tabSize={1}>
      <>
        <pre className="code">&lt;h1&gt;</pre>
        <h1>Hello, world!</h1>
        <h1 className="grey-text">
          I am <span className="highlight-text">Harmeet Singh</span>,
        </h1>
        <h1 className="grey-text">a JavaScript/frontend developer.</h1>
        <pre className="code">&lt;/h1&gt;</pre>
        <p className="qualifications">
          React | JavaScript | Redux | Node | GraphQL | Apollo | NextJS |
          Microfrontend
        </p>
      </>
    </Tabbed>
  );
};

export default AboutMe;
