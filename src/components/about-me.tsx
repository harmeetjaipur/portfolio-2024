import React from "react";
import Tabbed from "./tabbed";
import backgroundImage from "./pic.jpg";

const AboutMe: React.FC = () => {
  return (
    <Tabbed className="tabbed-content" tabSize={1}>
      <section className="hero" aria-label="Introduction">
        <div className="hero__copy">
          <p className="hero__eyebrow">Frontend developer · Toronto</p>
          <h1 className="hero__name">
            Harmeet <span>Singh</span>
          </h1>
          <p className="hero__line">
            JavaScript engineer building clear, resilient interfaces — from
            Jaipur to Toronto.
          </p>
        </div>
        <div className="hero__visual" aria-hidden="true">
          <img src={backgroundImage} alt="" />
        </div>
      </section>
    </Tabbed>
  );
};

export default AboutMe;
