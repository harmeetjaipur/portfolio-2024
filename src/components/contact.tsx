import { useEffect, useState } from "react";
import Sway from "./sway";

const clock = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Toronto",
  hour: "numeric",
  minute: "2-digit",
});

type ContactProps = {
  lifetimeCuts: number;
  onFight: () => void;
};

const Contact: React.FC<ContactProps> = ({ lifetimeCuts, onFight }) => {
  const [time, setTime] = useState(() => clock.format(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => setTime(clock.format(new Date())), 20000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <header className="section-head">
          <span className="section-head__index">04</span>
          <h2 className="section-head__title" id="contact-title">
            <Sway text="Say" /> <em><Sway text="hello" /></em>
          </h2>
        </header>
        <a className="contact__mail" href="mailto:hello@findharmeet.ca">
          hello@findharmeet.ca
        </a>
        <div className="contact__meta">
          <p className="contact__links">
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
          <p className="contact__clock">
            Toronto <span>{time}</span>
          </p>
          <button type="button" className="contact__fight" onClick={onFight}>
            Fancy a kite fight? <span aria-hidden="true">→</span>
          </button>
        </div>
        <p className="contact__fine">
          <span>© {new Date().getFullYear()} Harmeet Singh</span>
          {lifetimeCuts > 0 && (
            <span>
              {lifetimeCuts} {lifetimeCuts === 1 ? "kite" : "kites"} cut from this
              browser
            </span>
          )}
        </p>
      </div>
    </footer>
  );
};

export default Contact;
