<template>
  <v-app :style="backgroundColor" id="app">
    <Dialog />

    <drawer-admin/>
<!--    <drawer-admin v-if="isAdministrator" />-->
<!--    <drawer-moderator v-else-if="isModerator" />-->

    <v-content>
      <v-app-bar
        class="navbar"
        elevate-on-scroll
        extended
        extension-height=""
        app
      >
        <v-layout align-content-center>
          <v-flex align-self-center shrink>
            <v-app-bar-nav-icon @click.stop="toggleDrawer" />
          </v-flex>

          <v-flex align-self-center shrink>
            <nuxt-link class="navbar-title title mx-5" to="/manage">
              A-Blog: Administration
            </nuxt-link>
          </v-flex>

          <v-flex align-self-center shrink ml-5 class="breadcrumb">
            <BreadCrumb />
          </v-flex>
        </v-layout>
      </v-app-bar>

      <v-container fluid :style="backgroundColor" class="main-container pt-0">
        <v-layout justify-center class="main-layout">
          <v-flex xs12 class="main-flex" style="margin-top: -60px">
            <div class="layout-content">
              <nuxt />
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer class="admin-footer" inset app>
      <v-layout>
        <v-spacer />
        <v-flex style="text-align: center">
          <span class="design-and-code">
            Design & code:
            <a class="link ml-1" href="mailto:jrosk.managment@gmail.com">
              Jrosk
            </a>
          </span>
        </v-flex>
        <v-spacer />
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import BreadCrumb from "../components/widgets/BreadCrumb";
import DrawerAdmin from "../components/drawer/DrawerAdmin";
import Dialog from "../components/widgets/Dialog";
import DrawerModerator from "../components/drawer/DrawerModerator";

export default {
  head() {
    return {
      title: `${this.$Settings().siteTitle}: Administration`,
    };
  },
  name: "Dashboard",
  middleware: "member",
  components: { DrawerModerator, Dialog, DrawerAdmin, BreadCrumb },
  props: {
    source: String
  },
  data: () => ({}),
  computed: {
    // role() {
    //   if (this.$store.state.auth.loggedIn) {
    //     return this.$store.state.auth.user.is_staff ? "admin" : "moderator";
    //   }
    // },
    // isAdministrator() {
    //   return this.role === "admin";
    // },
    // isModerator() {
    //   return this.role === "moderator";
    // },
    backgroundColor() {
      return this.$vuetify.theme.dark ? "" : "background-color: white";
    }
  },
  methods: {
    toggleDrawer() {
      let drawer = this.$store.state.application.adminDrawer;
      this.$store.commit("application/SET_ADMIN_DRAWER", !drawer);
    }
  },
  mounted() {
    this.$vuetify.theme.dark = false;
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";
@import "../assets/scss/vuetify-override";

.navbar {
  border-bottom: 1px solid lightgray;
}

.navbar-title {
  color: inherit;
  text-decoration: inherit;
}

.admin-footer {
  border-top: 1px solid lightgray;
  background-color: white;
}

.breadcrumb {
  display: flex;
  @media screen and (max-width: $mobile) {
    display: none;
  }
}

.copyright {
  font-size: 12px;
  color: $paragraphs;
}
.design-and-code {
  font-size: 12px;
  color: $paragraphs;

  .link {
    color: $secondary;
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
  }
}
</style>
