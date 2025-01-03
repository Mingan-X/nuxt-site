// See tsParticles documentation for all available options
const darkOptions = {
  fullScreen: {
    enable: true,
    zIndex: -1,
  },
  background: {
    color: "#000",
  },
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "repulse",
      },
      onHover: {
        enable: true,
        mode: "bubble",
      },
    },
    modes: {
      bubble: {
        distance: 200,
        duration: 2,
        opacity: 0,
        size: 0,
        speed: 3,
      },
      repulse: {
        distance: 400,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: { value: "#ffffff" },
    number: {
      density: {
        enable: true,
      },
      value: 600,
    },
    opacity: {
      animation: {
        enable: true,
        speed: 5,
      },
      value: { min: 0.3, max: 0.6 },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: 1,
    },
  },
};
const lightOptions = {
  fullScreen: {
    enable: true,
    zIndex: -1,
  },
  background: {
    // color: "#FFF",
  },
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
      },
    },
    color: {
      value: "#94a3b8",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.5,
    },
    size: {
      value: {
        min: 1,
        max: 3,
      },
    },
    links: {
      enable: true,
      distance: 100,
      color: "#94a3b8",
      opacity: 1,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.5,
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
    },
    modes: {
      grab: {
        distance: 50,
        links: {
          color: "#94a3b8",
          opacity: 0.5,
        },
      },
      bubble: {
        distance: 50,
        size: 10,
        duration: 2,
        opacity: 0.8,
      },
      repulse: {
        distance: 200,
      },
      push: {
        quantity: 1,
      },
      remove: {
        quantity: 2,
      },
    },
  },
};
export default { dark: darkOptions, light: lightOptions };
