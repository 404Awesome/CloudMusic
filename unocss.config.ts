import { presetIcons, presetUno, presetAttributify, transformerDirectives, defineConfig } from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        "display": "inline-block",
        "vertical-align": "middle"
      }
    }),
  ],
  rules: [
    ["themeBgColor", { "background-color": "var(--theme-color)" }],
    ["themeColor", { "color": "var(--theme-color)" }],
    ["themeBorder", { "border-color": "var(--theme-color)" }],
    ["fontColor", { "color": "var(--font-color)" }],
    ["twoLineOmit", { "display": "-webkit-box", "overflow": "hidden", "-webkit-box-orient": "vertical", "text-overflow": "ellipsis", "-webkit-line-clamp": "2" }]
  ],
  shortcuts: {
    "wrapBox": "overflow-hidden m-y-0 m-x-auto w-9.5/10 lg:w-8/10",
    "grid2Cols": "grid gap-5 lg:gap-7 grid-cols-1 md:grid-cols-2",
    "grid3Cols": "grid gap-5 lg:gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    "grid4Cols": "grid gap-5 lg:gap-7 grid-cols-2 md:grid-cols-3 lg-grid-cols-4",
    "grid6Cols": "grid gap-5 lg:gap-7 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
    "tip": "themeColor text-17px pb-15px",
    "flexCenter": "flex items-center justify-center"
  },
  transformers: [
    transformerDirectives()
  ]
});