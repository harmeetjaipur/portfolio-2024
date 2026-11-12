import { useCallback, useEffect, useRef, useState } from "react";

import "./styles.scss";
import { fightRoster } from "./content";
import Contact from "./components/contact";
import Craft from "./components/craft";
import Hero from "./components/hero";
import Thread from "./components/thread";
import Workshop from "./components/workshop";
import type { FightStatus } from "./kite/engine";
import Sky from "./kite/sky";
import { unlockSound } from "./kite/sound";

const sections = [
  { id: "work", label: "Work" },
  { id: "craft", label: "Craft" },
  { id: "workshop", label: "AI" },
  { id: "contact", label: "Contact" },
];

const CUTS_KEY = "patang:cuts";
const THEME_KEY = "patang:theme";

type Theme = "light" | "dark";

const currentTheme = (): Theme => {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const readCuts = () => {
  try {
    return Number(window.localStorage.getItem(CUTS_KEY)) || 0;
  } catch {
    return 0;
  }
};

const writeCuts = (value: number) => {
  try {
    window.localStorage.setItem(CUTS_KEY, String(value));
  } catch {
    // Storage can be blocked; the count is only a nicety.
  }
};

const App: React.FC = () => {
  const [active, setActive] = useState("");
  const [fight, setFight] = useState(false);
  const [sound, setSound] = useState(false);
  const [status, setStatus] = useState<FightStatus>({
    cut: 0,
    total: fightRoster.length,
    latest: "",
  });
  const [cut, setCut] = useState<string[]>([]);
  const [lifetime, setLifetime] = useState(readCuts);
  const taps = useRef<number[]>([]);
  const [theme, setTheme] = useState<Theme>(currentTheme);

  const flipTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      // The choice just won't persist.
    }
    setTheme(next);
  };

  const startFight = useCallback(() => {
    setCut([]);
    setFight(true);
  }, []);
  const endFight = useCallback(() => setFight(false), []);

  const onCut = useCallback((id: string) => {
    setCut((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setLifetime((prev) => {
      const next = prev + 1;
      writeCuts(next);
      return next;
    });
  }, []);

  useEffect(() => {
    const update = () => {
      const mark = window.innerHeight * 0.4;
      let current = "";
      sections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mark) current = id;
      });
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!fight) return;
    document.body.classList.add("is-fighting");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFight(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("is-fighting");
      window.removeEventListener("keydown", onKey);
    };
  }, [fight]);

  return (
    <>
      <a className="skip" href="#work">
        Skip to work
      </a>
      <header className="nav">
        <button
          type="button"
          className="nav__mark"
          aria-label="Harmeet Singh, back to top"
          onClick={() => {
            const now = Date.now();
            taps.current = taps.current.filter((time) => now - time < 1400);
            taps.current.push(now);
            if (taps.current.length >= 4) {
              taps.current = [];
              startFight();
              return;
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          HS
        </button>
        <nav className="nav__links" aria-label="Sections">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="nav__theme"
          onClick={flipTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={theme === "dark" ? "Light mode" : "Dark mode"}
        >
          <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
        </button>
      </header>

      <main>
        <Hero />
        <Thread cut={cut} />
        <Craft />
        <Workshop />
      </main>
      <Contact lifetimeCuts={lifetime} onFight={startFight} />

      <Sky
        fight={fight}
        sound={sound}
        onCut={onCut}
        onStatus={setStatus}
        onDone={endFight}
      />

      {fight && (
        <div className="fight" role="region" aria-label="Kite fight">
          <p className="fight__count">
            {status.cut}
            <span>/{status.total}</span>
          </p>
          <p className="fight__latest" role="status">
            {status.latest}
          </p>
          <button
            type="button"
            className="fight__btn"
            aria-pressed={sound}
            onClick={() => {
              if (!sound) unlockSound();
              setSound(!sound);
            }}
          >
            Sound {sound ? "on" : "off"}
          </button>
          <button type="button" className="fight__btn" onClick={endFight} autoFocus>
            Leave
          </button>
          {status.cut === 0 && (
            <p className="fight__note">
              Every January, Jaipur's rooftops turn into kite fights. Cut a
              rival's string and everyone shouts <em lang="hi">“Wo kata!”</em>,
              Hindi for <em>“that one's cut!”</em>
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default App;
