import React from "react";
import { FaReact, FaPuzzlePiece, FaUserFriends } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { RiRobot2Line } from "react-icons/ri";
import {
  SiJavascript,
  SiRedux,
  SiNodedotjs,
  SiGraphql,
  SiApollographql,
  SiCss,
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
      "ES6+ syntax, asynchronous programming, and DOM craftsmanship.",
  },
  {
    title: "AI-assisted development",
    icon: <RiRobot2Line />,
    description:
      "Shipping faster with Cursor and Copilot-style workflows, strong prompts, and careful review of AI output.",
  },
  {
    title: "LLMs & prompts",
    icon: <HiSparkles />,
    description:
      "Using large language models for coding, docs, and product experiments with clear, iterative prompting.",
  },
  {
    title: "Redux",
    icon: <SiRedux />,
    description:
      "Predictable state management through a centralized store.",
  },
  {
    title: "CSS",
    icon: <SiCss />,
    description:
      "Layout systems, Flexbox, Grid, and thoughtful visual polish.",
  },
  {
    title: "Node",
    icon: <SiNodedotjs />,
    description: "Maintaining scalable services and RESTful APIs.",
  },
  {
    title: "GraphQL",
    icon: <SiGraphql />,
    description: "Flexible APIs for efficient data retrieval.",
  },
  {
    title: "Apollo",
    icon: <SiApollographql />,
    description: "Client and server data graphs with GraphQL.",
  },
  {
    title: "Microfrontend",
    icon: <FaPuzzlePiece />,
    description: "Breaking monoliths into manageable frontend pieces.",
  },
  {
    title: "Webpack",
    icon: <SiWebpack />,
    description: "Asset bundling and production optimization workflows.",
  },
  {
    title: "Mentorship",
    icon: <FaUserFriends />,
    description:
      "Code reviews, pairing, and growing engineers on the team.",
  },
];

const Skills: React.FC = () => {
  return (
    <Tabbed className="tabbed-content" tabSize={1}>
      <div className="skills-panel">
        <h2 className="section-heading skills-panel__heading">
          Skills
        </h2>
        <div className="skill-grid">
          {skillsetData.map((skill) => (
            <article className="skill-tile" key={skill.title}>
              <div className="icon" aria-hidden="true">
                {skill.icon}
              </div>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </article>
          ))}
        </div>
      </div>
    </Tabbed>
  );
};

export default Skills;
