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
            Frontend developer · Toronto
          </p>
          <h1 className="hero__name">
            <span className="hero__given">Harmeet</span>
            <span className="hero__family">Singh</span>
          </h1>
          <p className="hero__line">
            JavaScript engineer building clear, resilient interfaces — from
            Jaipur to Toronto.
          </p>
        </div>
        <div className="hero__visual" aria-hidden="true">
          <div className="hero__orbit" />
          <div className="hero__orbit-inner" />
          <div className="hero__ticks">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="hero__plate">
            <img src={backgroundImage} alt="" />
          </div>
        </div>
      </section>
    </Tabbed>
  );
};

export default AboutMe;
