import React from "react";
import styled from "styled-components";
import { FaReact, FaPuzzlePiece, FaUserFriends } from "react-icons/fa";
import {
  SiJavascript,
  SiRedux,
  SiNodedotjs,
  SiGraphql,
  SiApollographql,
  SiCss3,
  SiWebpack,
} from "react-icons/si";
import Tabbed from "./tabbed";

const skillsetData = [
  {
    title: "React",
    icon: <FaReact />,
    description: "Building user interfaces with component-based architecture.",
  },
  {
    title: "JavaScript",
    icon: <SiJavascript />,
    description:
      "Expertise in ES6+ syntax, asynchronous programming, and DOM manipulation.",
  },
  {
    title: "Redux",
    icon: <SiRedux />,
    description:
      "State management for JavaScript apps, ensuring predictable state through a centralized store.",
  },
  {
    title: "CSS",
    icon: <SiCss3 />,
    description:
      "Styling and creating beautifully designed user interfaces with advanced CSS techniques including Flexbox and Grid.",
  },
  {
    title: "Node",
    icon: <SiNodedotjs />,
    description:
      "Maintaining and upgrading scalable services and RESTful APIs with Node.js.",
  },
  {
    title: "GraphQL",
    icon: <SiGraphql />,
    description:
      "Designing and implementing APIs using GraphQL for more efficient and flexible data retrieval.",
  },
  {
    title: "Apollo",
    icon: <SiApollographql />,
    description:
      "Integrating Apollo Client and Server in applications to manage data with GraphQL.",
  },
  {
    title: "Microfrontend",
    icon: <FaPuzzlePiece />,
    description:
      "Implementing frontend apps using the mFE approach to break down monoliths into smaller, more manageable pieces.",
  },
  {
    title: "Webpack",
    icon: <SiWebpack />,
    description:
      "Automating asset bundling and optimization workflows to streamline development and production processes.",
  },
  {
    title: "Mentorship",
    icon: <FaUserFriends />,
    description:
      "Guiding and empowering developers through knowledge sharing, code reviews, and personalized advice to enhance team skills and productivity.",
  },
];

const SkillContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const SkillTile = styled.div`
  width: 200px;
  padding: 20px;
  background-color: #2b2d41;
  text-align: center;

  h3 {
    color: #ff4a57;
    margin: 10px 0;
  }

  .icon {
    color: #ff4a57;
    font-size: 2rem;
  }
`;

const StyledH1 = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const Skills: React.FC = () => {
  return (
    <Tabbed className="tabbed-content" tabSize={1}>
      <StyledH1 className="highlight-text">Skills</StyledH1>
      <SkillContainer>
        {skillsetData.map((skill) => (
          <SkillTile key={skill.title}>
            <div className="icon">{skill.icon}</div>
            <h3>{skill.title}</h3>
            <p>{skill.description}</p>
          </SkillTile>
        ))}
      </SkillContainer>
    </Tabbed>
  );
};

export default Skills;
