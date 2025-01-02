// See tsParticles documentation for all available options
const options = {
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
export default options;
