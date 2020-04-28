import Vue from "vue";

const settings = {
  siteTitle: "aBlog"
};

const colors = {
  primary: "#00949E",
  secondary: "#EC008C",
  green: "#139A43",
  blue: "#3587A4",
  paragraphs: "#757575",
};

Vue.prototype.$colors = () => colors;
Vue.prototype.$Settings = () => settings;
