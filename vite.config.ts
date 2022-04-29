import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";
import presetUno from "@unocss/preset-uno";
import presetIcons from "@unocss/preset-icons";
import presetAttributify from "@unocss/preset-attributify";
import AutoImport from "unplugin-auto-import/vite";
import Components from 'unplugin-vue-components/vite';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    vue(),
    vueSetupExtend(),
    Unocss({
      mode: "vue-scoped",
      presets: [
        presetUno(),
        presetAttributify({}),
        presetIcons({
          extraProperties: {
            "display": "inline-block",
            "vertical-align": "middle",
          },
        }),
      ],
    }),
    AutoImport({
      imports: ["vue"],
      resolvers: [ElementPlusResolver()],
      dts: "src/types/auto-imports.d.ts",
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: "src/types/auto-component.d.ts",
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src/"),
      store: resolve(__dirname, "src/store"),
      utils: resolve(__dirname, "src/utils"),
    },
  },
});
