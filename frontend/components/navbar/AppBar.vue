<template>
  <v-app-bar
    class="navbar"
    :class="sticky ? 'sticky' : 'normal'"
    :elevation="sticky ? '3' : '0'"
    short
    v-scroll="onScroll"
  >
    <v-layout align-center justify-space-between>
      <v-flex class="nav-logo" xs2 pt-2 grow>
        <transition name="fade">
          <Logo width="110" v-show="sticky" small />
        </transition>
      </v-flex>

      <v-spacer />

      <v-flex class="categories">
        <Categories />
      </v-flex>

      <v-flex class="search" grow>
        <search-nav />
      </v-flex>

      <v-spacer />

      <v-flex class="user" shrink>
        <nav-login-button />
      </v-flex>

      <v-flex v-if="$route.path.startsWith('/search')" class="icon mr-2" shrink>
        <v-btn
          @click="() => $store.commit('filters/SET_MODAL', true)"
          :color="$colors().secondary"
          text
          fab
        >
          <v-icon>mdi-filter</v-icon>
        </v-btn>
      </v-flex>

      <v-flex class="icon" shrink>
        <v-btn to="/search" fab text>
          <v-icon>mdi-account-search-outline</v-icon>
        </v-btn>
      </v-flex>

      <v-flex class="nav-icon" shrink>
        <v-app-bar-nav-icon @click.stop="$emit('drawer')" />
      </v-flex>
    </v-layout>

  </v-app-bar>
</template>

<script>
import Logo from "../Logo";
import Categories from "./Categories";
import SearchNav from "../search/SearchNav";
import NavLoginButton from "./NavLoginButton";

export default {
  name: "AppBar",
  components: { NavLoginButton, SearchNav, Logo, Categories },
  props: {
    drawer: { type: Boolean }
  },
  data: () => ({
    elevate: true,
    sticky: false,
    stickyHeight: 140,
  }),
  methods: {
    onScroll(e) {
      this.sticky = window.pageYOffset >= this.stickyHeight;
    }
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

.navbar {
  z-index: 2;
  border-bottom: 2px solid $primary !important;
}

.nav-logo {
  @media screen and (max-width: $medium) {
  }
}

.categories {
  display: block;
  @media screen and (max-width: $medium) {
    display: none;
  }
}
.search {
  display: block;
  @media screen and (max-width: $mobile) {
    display: none;
  }
}
.user {
  display: flex;
  @media screen and (max-width: $medium) {
    display: none;
  }
}
.icon {
  display: none;
  @media screen and (max-width: $mobile) {
    display: flex;
  }
}
.nav-icon {
  display: none;
  @media screen and (max-width: $medium) {
    display: flex;
  }
}

.normal {
  top: 140px;
}

.sticky {
  position: sticky;
  top: 0;
}
</style>
