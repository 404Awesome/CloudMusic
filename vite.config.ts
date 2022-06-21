import { resolve } from "path";
import Unocss from "unocss/vite";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import presetUno from "@unocss/preset-uno";
import presetIcons from "@unocss/preset-icons";
import viteCompression from "vite-plugin-compression";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import presetAttributify from "@unocss/preset-attributify";
import commonjs from 'rollup-plugin-commonjs';
import externalGlobals from 'rollup-plugin-external-globals';

export default ({ mode }) => {
  const plugins = [
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
    vueSetupExtend(),
  ];

  // 判断是否为生产环境
  // if (mode == "production") {
  //   plugins.push(...[
  //     // viteCompression(),
  //     // legacy({
  //     //   targets: ['defaults', 'not IE 11']
  //     // })

  //   ])
  // }

  return defineConfig({
    plugins,
    resolve: {
      alias: {
        "@": resolve(__dirname, "src/"),
        api: resolve(__dirname, "src/api"),
        store: resolve(__dirname, "src/store"),
        utils: resolve(__dirname, "src/utils"),
      },
    },
    build: {
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
        ]
      }
    },
    server: {
      open: true
    }
  })
}