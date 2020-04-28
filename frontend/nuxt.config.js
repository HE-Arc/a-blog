require("dotenv").config();

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: "aBlog",
    htmlAttrs: { lang: "fr" },
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Material+Icons"
      }
    ]
  },
  devModules: ["@nuxtjs/vuetify"],
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    "~/assets/scss/md-editor.scss",
  ],
  plugins: [
    "~/plugins/settings.js",
    "~/plugins/notifications.js",
    "~/plugins/axios.js",
    "~/plugins/vue-scrollto.js",
    { src: "~/plugins/vue-easymde.js", ssr: false },
    { src: "~/plugins/vue-draggable.js", ssr: false }
  ],
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    "@nuxtjs/markdownit",
    "@nuxtjs/dotenv",
    "nuxt-izitoast",
    ["cookie-universal-nuxt", { alias: "cookies" }]
  ],
  axios: {
    baseURL: process.env.API_HOST
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: "token/", method: "post", propertyName: "access" },
          user: { url: "users/current", method: "get", propertyName: "" },
          logout: false
        }
      }
    }
  },
  markdownit: {
    injected: true
  },
  /*
   ** Build configuration
   */
  build: {
    extend(config, ctx) {}
  }
};
