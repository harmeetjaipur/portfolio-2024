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
      value: 70,
      density: {
        enable: true,
        width: 1400,
      },
    },
    color: {
      value: ["#e8e6e1", "#e8a87c"],
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: { min: 0.15, max: 0.45 },
      animation: {
        enable: true,
        speed: 0.6,
        sync: false,
      },
    },
    size: {
      value: { min: 1, max: 2.4 },
    },
    links: {
      enable: true,
      distance: 120,
      color: "#e8e6e1",
      opacity: 0.12,
      width: 0.6,
    },
    move: {
      enable: true,
      speed: 0.8,
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
