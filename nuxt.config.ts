import pkg from "./package.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/i18n", "@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],
  css: ["bootstrap/dist/css/bootstrap.min.css", "@fortawesome/fontawesome-svg-core/styles.css", "~/assets/styles/main.css"],
  app: {
    head: {
      link: [
        { rel: "icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
        { rel: "apple-touch-icon", href: "/favicon-180.png" },
      ],
    },
  },
  i18n: {
    defaultLocale: "en",
    locales: [{ code: "en", name: "English", file: "en.json" }],
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: "http://localhost:8099",
      baseUrl: "http://localhost:3000",
      imgSrcFormat: "https://pokegame.blob.core.windows.net/pokemon/{key}.png",
      version: pkg.version,
    },
  },
  vite: {
    optimizeDeps: {
      include: [
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "logitar-js",
        "md5",
      ],
    },
  },
});
