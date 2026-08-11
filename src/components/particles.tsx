import type { ISourceOptions } from "@tsparticles/engine";

const particleOptions: ISourceOptions = {
  background: {
    color: {
      value: "#23263A",
    },
  },
  fpsLimit: 100,
  detectRetina: true,
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        width: 1803,
      },
    },
    color: {
      value: "#000",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.4,
      animation: {
        enable: true,
        speed: 1,
        sync: false,
      },
    },
    size: {
      value: { min: 1, max: 2 },
    },
    links: {
      enable: true,
      distance: 0,
      color: "#ffffff",
      opacity: 0.37,
      width: 0.64,
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
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
        mode: "bubble",
      },
      resize: {
        enable: true,
      },
    },
    modes: {
      grab: {
        distance: 400,
        links: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 0.8,
        speed: 3,
      },
      repulse: {
        distance: 100,
        duration: 0.4,
      },
      push: {
        quantity: 4,
      },
      remove: {
        quantity: 2,
      },
    },
  },
};

export default particleOptions;
