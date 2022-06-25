import { resolve } from "path";
import Unocss from "unocss/vite";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import commonjs from "rollup-plugin-commonjs";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import externalGlobals from "rollup-plugin-external-globals";
import { presetIcons, presetUno, presetAttributify, transformerDirectives } from "unocss";


export default ({ mode }) => {
  // 生产环境插件配置
  let prodPlugins = mode === "production" ? [
    viteCompression(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    visualizer()
  ] : [];

  return defineConfig({
    plugins: [
      vue(),
      Unocss({
        mode: "vue-scoped",
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
          ["fontColor", { "color": "var(--font-color)" }],
          ["sideNavBarWidth", { "width": "var(--sideNavBarWidth)" }],
          ["playBarHeight", { "width": "var(--playBarHeight)" }],
          ["topNavBarHeight", { "width": "var(--topNavBarHeight)" }],
          ["twoLineOmit", { "display": "-webkit-box", "overflow": "hidden", "-webkit-box-orient": "vertical", "text-overflow": "ellipsis", "-webkit-line-clamp": "2" }]
        ],
        shortcuts: {
          "wrapBox": "overflow-hidden m-y-0 m-x-auto w-9.5/10 lg:w-8/10",
          "grid2Cols": "grid gap-5 lg:gap-7 grid-cols-1 md:grid-cols-2",
          "grid3Cols": "grid gap-5 lg:gap-7 grid-cols-2 lg:grid-cols-3",
          "grid4Cols": "grid gap-5 lg:gap-7 grid-cols-2 md:grid-cols-3 lg-grid-cols-4",
          "grid6Cols": "grid gap-5 lg:gap-7 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
          "tip": "themeColor text-17px pb-15px",
          "flexCenter": "flex items-center justify-center"
        },
        transformers: [
          transformerDirectives()
        ]
      }),
      ...prodPlugins
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src/"),
        api: resolve(__dirname, "src/api"),
        store: resolve(__dirname, "src/store"),
        utils: resolve(__dirname, "src/utils"),
      },
    },
    build: {
      target: 'es2015',
      rollupOptions: {
        external: ['vue', 'vue-router', 'element-plus', 'vue-demi', 'pinia', 'lottie-web', 'plyr', 'axios'],
        plugins: [
          commonjs(),
          externalGlobals({
            vue: 'Vue',
            'plyr': 'Plyr',
            'axios': 'axios',
            'pinia': "Pinia",
            'vue-demi': 'VueDemi',
            'lottie-web': 'lottie',
            'vue-router': 'VueRouter',
            'element-plus': 'ElementPlus'
          }),
        ],
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]'
        }
      }
    },
    esbuild: {
      pure: ['console.log'],
      minify: true
    },
    server: {
      open: true
    }
  });
}