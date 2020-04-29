<template>
  <v-app id="app">
    <drawer-public />
    <Accessibility />
    <v-content>
      <app-bar class="navbar" @drawer="toggleDrawer" />
      <v-container grid-list-md fluid>
        <v-layout class="wrapper" row wrap justify-center>
          <v-flex class="mb-2" xs12 sm11 lg7>
            <BreadCrumb class="mt-2"/>
          </v-flex>
          <v-flex xs12 sm11 lg7>
            <nuxt />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <Footer class="footer" />
  </v-app>
</template>

<script>
import AppBar from "../components/navbar/AppBar";
import Footer from "../components/sections/Footer";
import BreadCrumb from "../components/widgets/BreadCrumb";
import DrawerPublic from "../components/drawer/DrawerPublic";
import Accessibility from "../components/widgets/Accessibility";

export default {
  components: {
    Accessibility,
    DrawerPublic,
    BreadCrumb,
    Footer,
    AppBar
  },
  data: () => ({
    drawer: false,
    primaryDrawer: {
      model: null
    },
    footer: {
      inset: false
    },
    passwordUpdateModal: false
  }),
  methods: {
    toggleDrawer() {
      this.$store.commit("application/SET_PUBLIC_DRAWER", true);
    },
    triggerPasswordUpdate() {
      if (this.$store.state.user.token !== "") {
        this.passwordUpdateModal = true;
      }
    }
  },
  mounted() {
    this.triggerPasswordUpdate();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

.footer {
  position: relative;
  bottom: 0;
  width: 100%;
}
</style>
