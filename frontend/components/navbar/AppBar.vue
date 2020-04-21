<template>
  <v-app-bar class="navbar sticky" short flat>

    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <nuxt-link class="logo display-1" to="/">
          <span v-on="on">{{ $Settings().siteTitle }}</span>
        </nuxt-link>
      </template>
      <span>Retour à l'accueil</span>
    </v-tooltip>

    <v-layout row justify-center>
      <v-flex xs6 lg7>
        <v-layout>
          <v-flex class="categories">
            <Categories />
          </v-flex>

          <v-flex class="search">
            <search-nav />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    
    <div class="login">
      <v-flex class="user" shrink>
        <login-button />
      </v-flex>

      <v-flex class="nav-icon" shrink>
        <v-app-bar-nav-icon @click.stop="$emit('drawer')" />
      </v-flex>
    </div>
    
    
  </v-app-bar>
</template>

<script>
import Categories from "./Categories";
import SearchNav from "../widgets/SearchNav";
import LoginButton from "./LoginButton";

export default {
  name: "AppBar",
  components: { LoginButton, SearchNav, Categories },
  props: {
    drawer: { type: Boolean }
  },
  data: () => ({
    elevate: true,
    sticky: true,
    stickyHeight: 140
  })
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.logo {
  position: absolute;
  left: 1em;
  font-weight: 200;
  text-decoration: none !important;
  color: $secondary;
  @media screen and (max-width: $mobile) {
    left: 0.5em;
  }
}

.login {
  position: absolute;
  right: 1em;
  @media screen and (max-width: $mobile) {
    right: 0.5px;
  }
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
    display: block;
  }
}

.sticky {
  position: sticky;
  top: 0;
}
</style>
