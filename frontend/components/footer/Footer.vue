<template>
  <v-footer app dark padless>
    <v-card
      flat
      tile
      :color="$colors().primary"
      class="lighten-1 white--text text-xs-center footer-card"
    >
      <v-card-text class="mt-4">
        <v-btn class="button-top mt-3" color="white" v-scroll-to="'#app'">
          <v-icon left>mdi-arrow-up-thick</v-icon>
          Haut de la page
        </v-btn>
      </v-card-text>
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-3 white--text" icon>
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text class="white--text pt-0 mb-4 body-1">
        Design & code:
        <a class="link" href="mailto:jrosk.managment@gmail.com">
          Jrosk
        </a>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    icons: [
    //   "mdi-facebook",
    //   "mdi-twitter",
    //   "mdi-gmail",
    //   "mdi-linkedin",
    //   "mdi-instagram"
    ]
  })
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.button-top {
  //margin-bottom: -20px !important;
  background-color: $secondary !important;
  margin-bottom: -20px;
}

.footer-card {
  box-shadow: inset 5px 49px 5px -48px rgba(0, 0, 0, 0.75) !important;

  width: 100%;
}

.link {
  color: white;
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
}
</style>
