import React from "react";

import Tabbed from "./tabbed";
import styled from "styled-components";

const StyledSection = styled.div`
  display: flex;
  gap: 4rem;
`;

const Experience: React.FC = () => {
  return (
    <Tabbed className="tabbed-content" tabSize={1}>
      <StyledSection className="work-experience">
        <div className="where-am-i-from">
          <pre className="code">&lt;h1&gt;</pre>
          <h1 className="grey-text">
            <span className="highlight-text">Where am I from?</span>
          </h1>
          <pre className="code">&lt;/h1&gt;</pre>
          <p>
            I am currently living in Toronto, Canada, originally from Jaipur,
            India—a city also known as the Pink City.
          </p>
          <p>
            Since 2015, my passion for JavaScript has grown, and I started
            working with the React stack. I cannot express my love and
            admiration for it enough. I have always strived to grow, learn, and
            improve on a daily basis, and working in startups has helped me
            achieve that.
          </p>
        </div>
        <div>
          <p className="about-me">
            <span className="highlight-text">2008 - 2010: </span>
            My first job in the field of technology. Worked as a Graphics
            Designer at{" "}
            <a
              href="http://a3logics.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              A3logics
            </a>
            .
          </p>
          <p className="about-me">
            <span className="highlight-text">2011: </span>I was starting to like
            development and joined{" "}
            <a
              href="http://www.doomshell.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Doomshell
            </a>{" "}
            as a UI designer & developer.
          </p>
          <p className="about-me">
            <span className="highlight-text">2012 - 2013: </span>Joined{" "}
            <a
              href="http://www.veesys.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Veesys
            </a>{" "}
            as a UI designer & developer. I was starting to move away from
            design.
          </p>
          <p className="about-me">
            <span className="highlight-text">2014: </span>Studied at{" "}
            <a
              href="https://www.georgebrown.ca/"
              rel="noopener noreferrer"
              target="_blank"
            >
              George Brown College
            </a>{" "}
            and finished a Post-Graduate Certificate in Advanced Digital Design
            (renamed to Interactive Media Management).
          </p>
          <p className="about-me">
            <span className="highlight-text">2015 - 2018: </span>Decided to
            leave designing behind and get into full-time development. I started
            working at{" "}
            <a
              href="https://www.clausehound.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Clausehound Inc
            </a>{" "}
            as a front-end developer.
          </p>
          <p className="about-me">
            <span className="highlight-text">Sept 2018 - Jan 2019: </span>
            My interest in everything Blockchain and its underlying architecture
            as a technology manifested into me joining{" "}
            <a
              href="https://northernblock.ca/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Northern Block
            </a>{" "}
            as a front-end developer.
          </p>
          <p className="about-me">
            <span className="highlight-text">Jan 2019 - Dec 2019: </span>
            Started working at{" "}
            <a
              href="https://nobul.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              nobul
            </a>{" "}
            as a full-stack developer. This is a real-estate marketplace
            providing space for consumers and agents who are looking to buy or
            sell properties.
          </p>
          <p className="about-me">
            <span className="highlight-text">Jan 2020 - March 2024: </span>
            Started working at{" "}
            <a
              href="https://www.venasolutions.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Vena Solutions
            </a>{" "}
            as a Sr Software Developer.
          </p>
        </div>
      </StyledSection>
    </Tabbed>
  );
};

export default Experience;
