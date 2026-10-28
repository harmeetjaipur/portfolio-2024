import React from "react";
import Tabbed from "./tabbed";
import backgroundImage from "./pic.jpg";

const AboutMe: React.FC = () => {
  return (
    <Tabbed className="tabbed-content" tabSize={1}>
      <section className="hero" aria-label="Introduction">
        <div className="hero__copy">
          <p className="hero__eyebrow">
            <span className="pulse" aria-hidden="true" />
            Sr Software Developer · Loblaw Digital
          </p>
          <h1 className="hero__name">
            <span className="hero__given">Harmeet</span>
            <span className="hero__family">Singh</span>
          </h1>
          <p className="hero__line">
            JavaScript engineer building clear, resilient interfaces, from
            Jaipur to Toronto.
          </p>
          <p className="hero__contact">
            <a href="mailto:hello@findharmeet.ca">hello@findharmeet.ca</a>
            <a
              href="https://github.com/harmeetjaipur"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/harmeet-singh-dev/"
              rel="noopener noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
          </p>
        </div>
        <div className="hero__visual">
          <div className="hero__orbit" aria-hidden="true" />
          <div className="hero__orbit-inner" aria-hidden="true" />
          <div className="hero__ticks" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="hero__plate">
            <img src={backgroundImage} alt="Harmeet Singh" />
          </div>
        </div>
      </section>
    </Tabbed>
  );
};

export default AboutMe;
