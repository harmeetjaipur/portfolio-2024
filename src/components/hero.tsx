import portrait from "./pic.jpg";
import Sway from "./sway";

const Hero: React.FC = () => (
  <section className="hero" id="top" aria-label="Introduction">
    <div className="wrap hero__inner">
      <p className="eyebrow">
        <span className="eyebrow__dot" aria-hidden="true" />
        Sr Developer, eComm · Loblaw Digital · Toronto
      </p>
      <h1 className="hero__name">
        <span className="hero__given">
          <Sway text="Harmeet" by="letter" />
        </span>{" "}
        <em className="hero__family">
          <Sway text="Singh" by="letter" />
        </em>
      </h1>
      <div className="hero__foot">
        <img className="hero__portrait" src={portrait} alt="Harmeet Singh" />
        <div>
          <p className="hero__line">
            Graphic designer turned JavaScript engineer, from Jaipur to
            Toronto. These days I build with AI every day, and build the
            tools that make it work better.
          </p>
          <p className="hero__links">
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
      </div>
      <p className="hero__hint" aria-hidden="true">
        <span className="hero__hint-arrow">↗</span> That kite is yours. Grab it.
      </p>
    </div>
  </section>
);

export default Hero;
