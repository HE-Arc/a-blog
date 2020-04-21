<template>
  <v-footer app padless class="footer-wrapper">
    <v-card flat tile class="footer-card">
      <v-card-text class="mt-4 suceboule">
        <v-btn class="button-top mb-3 mt-2" v-scroll-to="'#app'">
          <v-icon left>mdi-arrow-up-thick</v-icon>
          <span>Haut de la page</span>
        </v-btn>
      </v-card-text>
      <v-card-text class="white--text pt-0 mb-4 body-1 suceboule">
        <span>Design & code:</span>
        <a class="link" href="mailto:jrosk.managment@gmail.com">Jrosk</a>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.button-top {
  background-color: $secondary !important;
  color: white;
}

.footer-wrapper {
  background-color: $primary !important;
}

.suceboule {
  width: 220px;
  margin: 0 auto 0 auto;
}

.footer-card {
  background-color: $primary !important;
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
