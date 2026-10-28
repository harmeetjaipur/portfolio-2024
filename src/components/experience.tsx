import React from "react";
import Tabbed from "./tabbed";

const roles = [
  {
    year: "Oct 2024 – present",
    copy: (
      <>
        Sr Software Developer at{" "}
        <a
          href="https://www.loblawdigital.co/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Loblaw Digital
        </a>
        , building customer-facing web experiences for Loblaw's retail brands.
      </>
    ),
  },
  {
    year: "March 2024 – Oct 2024",
    copy: <>Took time off between roles.</>,
  },
  {
    year: "Jan 2020 – March 2024",
    copy: (
      <>
        Sr Software Developer at{" "}
        <a
          href="https://www.venasolutions.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Vena Solutions
        </a>
        .
      </>
    ),
  },
  {
    year: "Jan 2019 – Dec 2019",
    copy: (
      <>
        Full-stack developer at{" "}
        <a href="https://nobul.com/" rel="noopener noreferrer" target="_blank">
          nobul
        </a>
        , a real-estate marketplace for buyers, sellers, and agents.
      </>
    ),
  },
  {
    year: "Sept 2018 – Jan 2019",
    copy: (
      <>
        Joined{" "}
        <a
          href="https://northernblock.ca/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Northern Block
        </a>{" "}
        as a front-end developer, exploring blockchain product surfaces.
      </>
    ),
  },
  {
    year: "2015 – 2018",
    copy: (
      <>
        Moved into full-time development at{" "}
        <a
          href="https://www.clausehound.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Clausehound Inc
        </a>{" "}
        as a front-end developer.
      </>
    ),
  },
  {
    year: "2014",
    copy: (
      <>
        Studied at{" "}
        <a
          href="https://www.georgebrown.ca/"
          rel="noopener noreferrer"
          target="_blank"
        >
          George Brown College
        </a>{" "}
        — Post-Graduate Certificate in Advanced Digital Design (now Interactive
        Media Management).
      </>
    ),
  },
  {
    year: "2012 – 2013",
    copy: (
      <>
        Joined{" "}
        <a href="http://www.veesys.com/" rel="noopener noreferrer" target="_blank">
          Veesys
        </a>{" "}
        as a UI designer &amp; developer, moving further from pure design.
      </>
    ),
  },
  {
    year: "2011",
    copy: (
      <>
        Started leaning into development at{" "}
        <a
          href="http://www.doomshell.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Doomshell
        </a>{" "}
        as a UI designer &amp; developer.
      </>
    ),
  },
  {
    year: "2008 – 2010",
    copy: (
      <>
        My first job in technology. Worked as a Graphics Designer at{" "}
        <a href="http://a3logics.com/" rel="noopener noreferrer" target="_blank">
          A3logics
        </a>
        .
      </>
    ),
  },
];

const Experience: React.FC = () => {
  return (
    <Tabbed className="tabbed-content" tabSize={1}>
      <div className="work-experience">
        <div className="where-am-i-from">
          <h2 className="section-heading">
            Where am I <span>from?</span>
          </h2>
          <p>
            I live in Toronto, Canada, originally from Jaipur, India — the Pink
            City.
          </p>
          <p>
            Since 2015 my work has centered on JavaScript and React. Startups
            kept me learning daily, and I still work that way.
          </p>
        </div>
        <div className="timeline">
          {roles.map((role) => (
            <article className="log-entry" key={role.year}>
              <span className="timeline__year">{role.year}</span>
              <p className="timeline__item">{role.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </Tabbed>
  );
};

export default Experience;
