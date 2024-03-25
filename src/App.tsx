import { useEffect, useMemo } from "react";
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
    title: "Technical Skills Summary",
    id: "skills",
  },
];

const App: React.FC = () => {
  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine: any) => {
      await loadSlim(engine);
    });
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
        //@ts-ignore
        options={options}
      />
      <div className="navigation">{pages.map((page) => page.button())}</div>
      {pages.map(({ component: Component, title, id }) => (
        <div
          style={{ position: "relative", zIndex: 1, width: "100%" }}
          className="section"
          id={id}
        >
          <Component key={title} />
        </div>
      ))}
    </div>
  );
};

export default App;
