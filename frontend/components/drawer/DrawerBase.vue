<template>
  <v-navigation-drawer
    app
    overflow
    v-model="drawer"
    :right="right"
    :temporary="temporary"
  >
    <drawer-user-section/>

    <v-divider></v-divider>

    <v-list-item
      v-if="!isAdmin"
      to="/search"
      @click="defaultState"
      class="search"
    >
      <v-list-item-action>
        <v-icon>mdi-account-search-outline</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Recherche</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item v-if="$auth.loggedIn" :to="linkTo">
      <v-list-item-action>
        <v-icon>{{ linkIcon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>{{ linkText }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list>
      <v-subheader class="subheader">{{ contentTitle }}</v-subheader>

      <slot></slot>
      
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import DrawerUserSection from "./DrawerUserSection";

export default {
  name: "DrawerBase",
  components: { DrawerUserSection },
  props: {
    linkText: { type: String },
    linkIcon: { type: String },
    linkTo: { type: String },
    contentTitle: { type: String },
    stateGetter: { type: String },
    state: { type: Boolean },
    right: { type: Boolean, default: false },
    temporary: { type: Boolean, default: false }
  },
  computed: {
    drawer: {
      get() {
        return this.state;
      },
      set(value) {
        this.$store.commit(`application/${this.stateGetter}`, value);
      }
    },
    isAdmin() {
      return this.$route.path.startsWith("/manage");
    }
  },
  methods: {
    defaultState() {
      this.$store.commit("application/SET_DRAWERS_TO_DEFAULT");
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.search {
  display: none;
  @media screen and (max-width: $mobile) {
    display: flex;
  }
}
.subheader {
  user-select: none;
}
</style>
