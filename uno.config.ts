import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetTypography,
} from "unocss";

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetTypography()],
  rules: [
    // Custom gradient text rule
    [
      "text-gradient-purple",
      {
        background: "linear-gradient(to right, #9333ea, #ec4899)",
        "-webkit-background-clip": "text",
        "background-clip": "text",
        "-webkit-text-fill-color": "transparent",
      },
    ],
  ],
  shortcuts: {
    // Common button styles
    "btn-primary":
      "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
    "btn-secondary":
      "border-2 border-gray-300 hover:border-purple-500 px-8 py-3 rounded-full transition-all duration-300",
    // Card styles
    "card-hover":
      "hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-2",
  },
  theme: {
    colors: {
      primary: {
        50: "#faf5ff",
        500: "#9333ea",
        600: "#9333ea",
        700: "#7c3aed",
      },
    },
  },
});
