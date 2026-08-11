import { useCallback, useEffect, useState } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

import "./styles.scss";
import AboutMe from "./components/about-me";
import Experience from "./components/experience";
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

  const initParticles = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "0px", threshold: 0.5 }
    );

    pages.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ParticlesProvider init={initParticles}>
      <div className="App">
        <Particles id="tsparticles" options={particleOptions} />
        <div className="navigation">
          {pages.map((page) => (
            <button
              onClick={() => {
                setActiveSection(page.id);
                scrollTo(page.id);
              }}
              className={activeSection === page.id ? "active" : ""}
              key={page.id}
            >
              {page.title}
            </button>
          ))}
        </div>
        {pages.map(({ component: Component, title, id }) => (
          <div
            key={id}
            style={{ position: "relative", zIndex: 1, width: "100%" }}
            className="section"
            id={id}
            aria-label={title}
          >
            <Component />
          </div>
        ))}
      </div>
    </ParticlesProvider>
  );
};

export default App;
