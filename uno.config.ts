import { defineConfig, presetAttributify, presetUno } from "unocss";

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  rules: [],
  shortcuts: {},
  theme: {},
});
