import { resolve } from "path";
import Unocss from "unocss/vite";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import presetUno from "@unocss/preset-uno";
import presetIcons from "@unocss/preset-icons";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import presetAttributify from "@unocss/preset-attributify";

export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
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
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src/"),
      api: resolve(__dirname, "src/api"),
      store: resolve(__dirname, "src/store"),
      utils: resolve(__dirname, "src/utils"),
      "vue": "https://esm.run/vue@3.2.25",
      "plyr": "https://esm.run/plyr@3.7.2",
      "mitt": "https://esm.run/mitt@3.0.0",
      "axios": "https://esm.run/axios@0.27.1",
      "pinia": "https://esm.run/pinia@2.0.13",
      "lottie-web": "https://esm.run/lottie-web@5.9.3",
      "@vueuse/core": "https://esm.run/@vueuse/core@8.3.1",
    },
  },
  optimizeDeps: {
    exclude: ['vue', 'axios', 'lottie-web', 'plyr', '@vueuse/core', 'pinia', 'mitt']
  },
  server: {
    open: true
  }
});