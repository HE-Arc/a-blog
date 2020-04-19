<template>
  <v-app id="app" :style="backgroundColor">
    <drawer-public />

    <password-update-modal
      title="Réinitialisation"
      :modal="passwordUpdateModal"
      @close="passwordUpdateModal = false"
    />

    <v-content class="main-content">
      <app-bar class="navbar" @drawer="toggleDrawer" />

      <Accessibility />
      <v-container
        fluid
        :style="backgroundColor"
        class="main-container mt-0 pt-0"
      >
        <v-layout justify-center class="main-layout">
          <v-flex xs12 sm11 md10 lg7 class="main-flex">
<!--            <Logo class="logo" width="280"/>-->
            <div class="layout-content">
              <bread-crumb class="bread-crumb" />
              <nuxt />
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <Footer class="footer" />
  </v-app>
</template>

<script>
import AppBar from "../components/navbar/AppBar";
import Logo from "../components/Logo";
import Footer from "../components/footer/Footer";
import BreadCrumb from "../components/widgets/BreadCrumb";
import Drawer from "../components/drawer/DrawerAdmin";
import DrawerPublic from "../components/drawer/DrawerPublic";
import Accessibility from "../components/widgets/Accessibility";
import PasswordUpdateModal from "../components/modal/PasswordUpdateModal";

export default {
  components: {
    PasswordUpdateModal,
    Accessibility,
    DrawerPublic,
    Drawer,
    BreadCrumb,
    Footer,
    Logo,
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
  computed: {
    backgroundColor() {
      return this.$vuetify.theme.dark ? "" : "background-color: white";
    }
  },
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

<style lang="scss" scoped>

@import "../assets/scss/variables";
/*@import "../assets/scss/vuetify-override";*/

p,
ul,
ol {
  color: $paragraphs;
  font-size: 18px;
  line-height: 30px;
  font-weight: 300;
}

.logo {
  margin-top: -20px;
}

.main-content {
  z-index: 1 !important;
  box-shadow: none !important;
  margin-bottom: 100px;
}

.main-container {
  margin-top: -30px !important;
  position: relative;
  z-index: 0 !important;
  padding-bottom: 0;
  margin-bottom: -225px;
}

.main-layout {
}

.main-flex {
  .layout-content {
    margin-top: 50px;
  }
}

.bread-crumb {
  margin-top: -10px;
  margin-bottom: 20px;
}

.footer {
  z-index: 0 !important;
  position: relative;
  /*position: fixed;*/
  bottom: 0;
  width: 100%;
  font-size: 100px;
}
</style>
