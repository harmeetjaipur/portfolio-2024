import { useEffect, useMemo, useState } from "react";
//@ts-ignore
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

import "./styles.scss";
import AboutMe from "./components/about-me";
import Experience from "./components/experience";
import Skills from "./components/skills";
import particleOptions from "./components/particles";

const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const pages = [
  {
    button: () => <button onClick={() => scrollTo("about")}>About Me</button>,
    component: AboutMe,
    title: "About Me",
    id: "about",
  },
  {
    button: () => (
      <button onClick={() => scrollTo("experience")}>Experience</button>
    ),
    component: Experience,
    title: "Work Experience",
    id: "experience",
  },
  {
    button: () => <button onClick={() => scrollTo("skills")}>Skills</button>,
    component: Skills,
    title: "Skills",
    id: "skills",
  },
];

const App: React.FC = () => {
  // State to track the active section
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    initParticlesEngine(async (engine: any) => {
      await loadSlim(engine);
    });

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

    // Observe each section
    pages.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    // Clean up observer on component unmount
    return () => observer.disconnect();
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#23263A",
        },
      },
      fpsLimit: 100,
      interactivity: particleOptions.interactivity,
      particles: particleOptions.particles,
      detectRetina: true,
    }),
    []
  );

  return (
    <div className="App">
      <Particles
        id="tsparticles"
        // @ts-ignore
        options={options}
      />
      <div className="navigation">
        {pages.map((page) => (
          <button
            onClick={() => scrollTo(page.id)}
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
        >
          <Component />
        </div>
      ))}
    </div>
  );
};

export default App;
