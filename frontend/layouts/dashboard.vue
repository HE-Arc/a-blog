<template>
  <div>
    <Dialog />
    <v-app id="app" style="background-color: white">
      <drawer-admin />

      <v-content>
        <v-app-bar
          class="navbar"
          elevate-on-scroll
          extension-height=""
          color="white"
          extended
          flat
          app
        >
          <v-layout align-content-center>
            <v-flex align-self-center shrink>
              <v-app-bar-nav-icon @click.stop="toggleDrawer" />
            </v-flex>

            <v-flex align-self-center shrink>
              <nuxt-link class="navbar-title title mx-5" to="/administration">
                A-Blog: Administration
              </nuxt-link>
            </v-flex>

            <v-flex align-self-center shrink ml-5 class="breadcrumb">
              <BreadCrumb />
            </v-flex>
          </v-layout>
        </v-app-bar>

        <v-container>
          <nuxt />
        </v-container>
      </v-content>

      <v-footer class="admin-footer" inset app>
        <v-layout>
          <v-spacer />
          <v-flex style="text-align: center">
            <span class="design-and-code">
              Design & code:
              <a ml1 class="link" href="mailto:jrosk.managment@gmail.com">
                Jrosk
              </a>
            </span>
          </v-flex>
          <v-spacer />
        </v-layout>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import BreadCrumb from "../components/widgets/BreadCrumb";
import DrawerAdmin from "../components/drawer/DrawerAdmin";
import Dialog from "../components/widgets/Dialog";

export default {
  head() {
    return {
      title: `${this.$Settings().siteTitle}: Administration`
    };
  },
  name: "Dashboard",
  middleware: "member",
  components: { Dialog, DrawerAdmin, BreadCrumb },
  props: {
    source: String
  },
  data: () => ({}),
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
