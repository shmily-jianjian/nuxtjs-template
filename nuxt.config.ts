import tailwindcss from "@tailwindcss/vite";
import { writeFileSync } from "fs";
const { NUXT_API_PREFIX, NUXT_API_URL, NUXT_API_REDIRECT, NUXT_LOGIN_URL } =
  process.env;

export default defineNuxtConfig({
  devtools: { enabled: true },

  icon: {
    mode: "css",
    cssLayer: "base",
  },

  ssr: false,

  modules: [
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@vueuse/nuxt",
    "@element-plus/nuxt",
  ],
  elementPlus: {
    defaultLocale: "zh-cn",
    importStyle: "scss",
    themes: ["dark"],
  },

  css: ["~/styles/tailwind.css"],

  runtimeConfig: {
    public: {
      apiPrefix: NUXT_API_PREFIX,
      apiUrl: NUXT_API_URL,
      apiRedirectUrl: NUXT_API_REDIRECT,
      loginUrl: NUXT_LOGIN_URL,
    },
  },

  vite: {
    plugins: [tailwindcss()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element.scss" as element;`,
        },
      },
    },
  },
  nitro: {
    // nitro中会自动将 /api2 替换成 https://i.maoyan.com/api/不会保留 /api2和vite中的不一样的
    devProxy: {
      "/api3": {
        target: "http://gamalogdata.dodjoy.com/",
        changeOrigin: true,
      },
      [NUXT_API_PREFIX]: {
        target: NUXT_API_URL,
        changeOrigin: true,
      },
    },
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  compatibilityDate: "2025-04-23",
});
