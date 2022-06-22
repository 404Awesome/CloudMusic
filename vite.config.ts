import { resolve } from "path";
import Unocss from "unocss/vite";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import presetUno from "@unocss/preset-uno";
import commonjs from "rollup-plugin-commonjs";
import presetIcons from "@unocss/preset-icons";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import presetAttributify from "@unocss/preset-attributify";
import externalGlobals from "rollup-plugin-external-globals";


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
          presetAttributify({}),
          presetIcons({
            extraProperties: {
              "display": "inline-block",
              "vertical-align": "middle"
            },
          })
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
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
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