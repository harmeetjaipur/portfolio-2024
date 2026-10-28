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
    description:
      "Interfaces I have built with since 2015, component by component.",
    lead: true,
  },
  {
    title: "AI-assisted development",
    icon: <RiRobot2Line />,
    description:
      "Cursor and Copilot-style tools speed up the draft. I still review what ships.",
    lead: true,
  },
  {
    title: "Mentorship",
    icon: <FaUserFriends />,
    description: "Code reviews, pairing, and growing the engineers beside me.",
    lead: true,
  },
  {
    title: "JavaScript",
    icon: <SiJavascript />,
    description:
      "The language under all of it: modern syntax, async work, and the DOM.",
  },
  {
    title: "LLMs & prompts",
    icon: <HiSparkles />,
    description:
      "Prompts for code, docs, and product experiments, rewritten until the result is clear.",
  },
  {
    title: "Redux",
    icon: <SiRedux />,
    description:
      "Shared state for screens that more than one part of a product depends on.",
  },
  {
    title: "CSS",
    icon: <SiCss />,
    description:
      "Layout, Flexbox, Grid, and the polish that makes a screen feel finished.",
  },
  {
    title: "Node",
    icon: <SiNodedotjs />,
    description: "Services and REST APIs kept running next to the interface.",
  },
  {
    title: "GraphQL",
    icon: <SiGraphql />,
    description: "APIs shaped around the data a screen actually needs.",
  },
  {
    title: "Apollo",
    icon: <SiApollographql />,
    description: "How I have wired those graphs into the client.",
  },
  {
    title: "Microfrontend",
    icon: <FaPuzzlePiece />,
    description:
      "Breaking a large frontend into pieces teams can ship on their own.",
  },
  {
    title: "Webpack",
    icon: <SiWebpack />,
    description: "Production bundles when a project outgrows the defaults.",
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
            <article
              className={skill.lead ? "skill-tile skill-tile--lead" : "skill-tile"}
              key={skill.title}
            >
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
