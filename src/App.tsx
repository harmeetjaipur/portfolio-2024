import { useCallback, useEffect, useRef, useState } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

import "./styles.scss";
import AboutMe from "./components/about-me";
import { DeckProvider } from "./components/deck";
import { LogConfetti } from "./components/field-confetti";
import Experience from "./components/experience";
import Hud from "./components/hud";
import SignalRun from "./components/signal-run";
import Skills from "./components/skills";
import particleOptions from "./components/particles";

/**
 * Smooth-scrolls to a section by element id.
 */
const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const pages = [
  {
    component: AboutMe,
    title: "About Me",
    id: "about",
  },
  {
    component: Experience,
    title: "Work Experience",
    id: "experience",
  },
  {
    component: Skills,
    title: "Skills",
    id: "skills",
  },
];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [running, setRunning] = useState(false);
  const markTaps = useRef<number[]>([]);
  const openRun = useCallback(() => setRunning(true), []);
  const closeRun = useCallback(() => setRunning(false), []);

  const initParticles = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
      document.documentElement.style.setProperty("--my", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const update = () => {
      const mark = window.scrollY + window.innerHeight * 0.28;
      let current = pages[0].id;

      pages.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= mark) current = id;
      });

      setActiveSection(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <ParticlesProvider init={initParticles}>
      <DeckProvider>
      <div className="App">
        <Particles id="tsparticles" options={particleOptions} />
        <header className="navigation">
          <button
            className="navigation__mark"
            onClick={() => {
              const now = Date.now();
              markTaps.current = markTaps.current.filter((time) => now - time < 1400);
              markTaps.current.push(now);
              if (markTaps.current.length >= 4) {
                markTaps.current = [];
                setRunning(true);
                return;
              }
              setActiveSection("about");
              scrollTo("about");
            }}
          >
            HS
          </button>
          <nav className="navigation__links" aria-label="Sections">
            {pages.map((page, index) => (
              <button
                onClick={() => {
                  setActiveSection(page.id);
                  scrollTo(page.id);
                }}
                className={activeSection === page.id ? "active" : ""}
                aria-current={activeSection === page.id ? "true" : undefined}
                key={page.id}
              >
                <span className="navigation__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {page.title}
              </button>
            ))}
          </nav>
        </header>
        <Hud
          activeSection={activeSection || "about"}
          running={running}
          onRun={openRun}
          onJump={(id) => {
            setActiveSection(id);
            scrollTo(id);
          }}
        />
        <LogConfetti />
        {running && <SignalRun onClose={closeRun} />}
        {pages.map(({ component: Component, title, id }, index) => (
          <div
            key={id}
            className="section"
            id={id}
            aria-label={title}
            data-index={String(index + 1).padStart(2, "0")}
          >
            <Component />
          </div>
        ))}
      </div>
      </DeckProvider>
    </ParticlesProvider>
  );
};

export default App;
