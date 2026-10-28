import React from "react";
import { useDeck } from "./deck";
import Tabbed from "./tabbed";

const roles = [
  {
    year: "Oct 2024 – present",
    place: "Loblaw Digital",
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
    place: "Time off",
    copy: <>Took time off between roles.</>,
  },
  {
    year: "Jan 2020 – March 2024",
    place: "Vena Solutions",
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
    place: "nobul",
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
    place: "Northern Block",
    copy: (
      <>
        Joined{" "}
        <a
          href="https://northernblock.io/"
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
    place: "Clausehound",
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
    place: "George Brown",
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
    place: "Veesys",
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
    place: "Doomshell",
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
    place: "A3logics",
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

export const logSize = roles.length;

export const runStops = roles.map(({ year, place }) => ({ year, place }));

const Experience: React.FC = () => {
  const { dock, docked, visited } = useDeck();

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
          {roles.map((role) => {
            const locked = docked === role.year;

            return (
              <article
                className={
                  locked
                    ? "log-entry log-entry--seen log-entry--docked"
                    : visited.includes(role.year)
                      ? "log-entry log-entry--seen"
                      : "log-entry"
                }
                data-year={role.year}
                key={role.year}
                onClick={(event) => {
                  if ((event.target as HTMLElement).closest("a")) return;
                  dock(role.year);
                }}
              >
                {locked && <span className="log-scan" aria-hidden="true" />}
                <button
                  type="button"
                  className="timeline__year"
                  aria-pressed={locked}
                  onClick={() => dock(role.year)}
                >
                  {role.year}
                </button>
                <p className="timeline__item">
                  {locked && <span className="timeline__tx">Transmission</span>}
                  {role.copy}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </Tabbed>
  );
};

export default Experience;
