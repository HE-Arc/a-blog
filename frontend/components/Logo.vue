<template>
  <v-tooltip right>
    <template v-slot:activator="{ on }">
      <nuxt-link class="logo" to="/" :style="logoStyle">
        <span class="ab">aB</span>
        <span class="log" :style="`margin-left: ${separation}px`">log</span>
      </nuxt-link>
    </template>
    <span>Retour à l'accueil</span>
  </v-tooltip>
</template>

<script>
  export default {
    props: {
      size: { type: String, default: "25" },
      separation: { type: String, default: "-5"},
      absolute: { type: Boolean, default: true}
    },
    name: 'Logo',
    computed: {
      logoStyle() {
        let abs = this.absolute ? "absolute" : "relative"
        return `font-size: ${this.size}px; position: ${abs}`;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables";
  

  .logo {
    text-decoration: none !important;
    
    :first-child {
      font-family: 'Roboto Slab', serif;
      font-weight: 400;
      padding: 0 2px 0 2px;
      border-radius: 5px;
      background-color: $secondary;
      color: white;
    }
    
    :last-child {
      font-family: 'Roboto Slab', serif;
      font-weight: 400;
      color: #363636;
    }
    
    @media screen and (max-width: $mobile) {
      left: 0.5em;
    }
  }
</style>
