<template>
  <div class="zoom-menu">
    <v-btn
      @click="toggle()"
      :color="$colors().blue"
      large
      dark
      fab
      elevation="1"
    >
      <v-icon v-if="!activated">mdi-human-handsdown</v-icon>
      <v-icon v-else>mdi-close</v-icon>
    </v-btn>

    <transition name="fade">
      <div class="zoom-options" v-show="activated">
        <v-btn
          @click="swapTheme"
          :style="themeColor"
          class="buttons"
          fab
          medium
          elevation="3"
        >
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-btn>

        <v-btn
          v-if="!disabled"
          v-for="(i, idx) in buttons"
          :key="idx"
          :class="i.class"
          :style="`color: ${i.color}`"
          @click="i.f"
          color="blue darken-2"
          class="buttons"
          elevation="3"
          medium
          dark
          fab
        >
          <v-icon ma-0 pa-5>{{ i.icon }}</v-icon>
        </v-btn>
      </div>
    </transition>
  </div>
</template>

<script>
import Helpers from "../../assets/js/Helpers";

export default {
  name: "Zoom",
  data: () => ({
    elements: ["p", "h1", "h2", "h3", "h4", "h6", "ul", "ol"],
    buttons: [],
    activated: false,
    selectors: [],
    increment: 2,
    level: 0,
    max: 5
  }),
  computed: {
    themeColor() {
      let color = !this.$vuetify.theme.dark ? "darkblue" : "orange";
      return `color: ${color};`;
    },
    disabled() {
      return this.$route.path.startsWith("/search");
    }
  },
  methods: {
    swapTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      let bg = this.$vuetify.theme.dark ? "#303030" : "#fff";
      try {
        document.querySelector("blockquote").style.setProperty("--color", bg);
      } catch (e) {
        null;
      }
      Helpers.textElementsColor(this.$vuetify.theme);
    },
    toggle() {
      this.init();
      this.activated = !this.activated;
    },
    changeFontSize(value) {
      this.selectors.forEach(i => {
        let query;
        if (i.element[0] === ".") {
          let selector = i.element.slice(1, i.element.length);
          query = Array.from(document.getElementsByClassName(selector));
        } else {
          query = Array.from(document.getElementsByTagName(i.element));
        }
        i.current = value ? i.current + value : i.default;
        query.forEach(j => {
          j.style.fontSize = i.current + "px";
        });
      });
    },
    zoomIn() {
      if (this.level < this.max) {
        this.changeFontSize(this.increment);
        this.level++;
      } else {
        this.$notifications("error", "Taille maximum atteinte", "once");
      }
    },
    zoomOut() {
      if (this.level > -this.max) {
        this.changeFontSize(-this.increment);
        this.level--;
      } else {
        this.$notifications("error", "Taille minimum atteinte", "once");
      }
    },
    zoomReset() {
      this.changeFontSize();
      this.level = 0;
      this.toggle();
      this.$notifications("info", "Taille par défaut", "once");
    },
    init() {
      this.selectors = [];
      this.elements.forEach(i => {
        let query = document.querySelector(i);
        if (query) {
          let size = parseInt(getComputedStyle(query).fontSize);
          let selector = { element: i, default: size, current: size };
          this.selectors.push(selector);
        }
      });
    }
  },
  mounted() {
    this.buttons = [
      {
        class: "minus",
        f: this.zoomOut,
        icon: "mdi-magnify-minus",
        color: this.$colors().secondary,
        tooltip: "Réduire la taille de la police"
      },
      {
        class: "reset",
        f: this.zoomReset,
        icon: "mdi-origin",
        color: this.$colors().green,
        tooltip: "Réinitialiser la taille de la police"
      },
      {
        class: "plus",
        f: this.zoomIn,
        icon: "mdi-magnify-plus",
        color: this.$colors().primary,
        tooltip: "Augmenter la taille de la police"
      }
    ];
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.zoom-menu {
  z-index: 10;
  position: fixed;
  bottom: 80px;
  right: 20px;

  display: flex;
  flex-direction: column-reverse;

  .buttons {
    background-color: white !important;
    margin-right: -5px;
    margin-bottom: 10px;
  }

  .zoom-options {
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>
