import type { ISourceOptions } from "@tsparticles/engine";

const particleOptions: ISourceOptions = {
  background: {
    color: {
      value: "transparent",
    },
  },
  fullScreen: {
    enable: true,
    zIndex: 0,
  },
  fpsLimit: 60,
  detectRetina: true,
  particles: {
    number: {
      value: 42,
      density: {
        enable: true,
        width: 1600,
      },
    },
    color: {
      value: ["#d6ff3e", "#6ae7ff"],
    },
    shape: {
      type: "square",
    },
    opacity: {
      value: { min: 0.2, max: 0.7 },
      animation: {
        enable: true,
        speed: 0.4,
        sync: false,
      },
    },
    size: {
      value: { min: 1, max: 2.2 },
    },
    links: {
      enable: false,
    },
    move: {
      enable: true,
      speed: 0.35,
      direction: "none",
      random: true,
      straight: false,
      outModes: {
        default: "out",
      },
    },
  },
  interactivity: {
    detectsOn: "window",
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      onClick: {
        enable: false,
      },
      resize: {
        enable: true,
      },
    },
    modes: {
      repulse: {
        distance: 90,
        duration: 0.35,
      },
    },
  },
};

export default particleOptions;
