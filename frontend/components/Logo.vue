<template>
  <v-tooltip right>
    <template v-slot:activator="{ on }">
      <nuxt-link class="logo" to="/">
        <span class="ab">aB</span>
        <span class="log">log</span>
      </nuxt-link>
    </template>
    <span>Retour à l'accueil</span>
  </v-tooltip>
</template>

<script>
  export default {
    name: 'Logo',
  };
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables";
  

  .logo {
    text-decoration: none !important;
    position: absolute;
    left: 1em;
    font-size: 25px;
    
    :first-child {
      font-family: 'Roboto Slab', serif;
      font-weight: 400;
      padding: 0 2px 0 2px;
      border-radius: 5px;
      background-color: $secondary;
      color: white;
    }
    
    :last-child {
      margin-left: -5px;
      font-family: 'Roboto Slab', serif;
      font-weight: 400;
      color: #363636;
    }
    
    @media screen and (max-width: $mobile) {
      left: 0.5em;
    }
  }
</style>
