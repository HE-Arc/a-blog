require("dotenv").config();

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: "ABLOG",
    htmlAttrs: { lang: "fr" },
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Material+Icons"
      }
    ]
  },
  devModules: ["@nuxtjs/vuetify"],

  // Vuetify options
  vuetify: {
    //  theme: { }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    "~/assets/scss/md-editor.scss",
    { src: '~/assets/scss/vuetify-override.scss', lang: 'scss',ssr:false }
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/settings.js",
    "~/plugins/notifications.js",
    "~/plugins/helpers.js",
    "~/plugins/axios.js",
    "~/plugins/vue-scrollto.js",
    { src: "~/plugins/vue-isotope.js", ssr: false },
    { src: "~/plugins/vue-easymde.js", ssr: false },
    { src: "~/plugins/vue-draggable.js", ssr: false }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    "@nuxtjs/markdownit",
    "@nuxtjs/dotenv",
    "@nuxtjs/moment",
    "@nuxtjs/google-analytics",
    "nuxt-izitoast",
    ["cookie-universal-nuxt", { alias: "cookies" }]
  ],
  axios: {
    // proxyHeaders: false
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
  moment: {
    defaultLocale: "fr",
    locales: ["fr"]
  },
  googleAnalytics: {
    id: "UA-125907056-2"
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
