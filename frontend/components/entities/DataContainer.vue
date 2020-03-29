<template>
  <v-card :elevation="elevation" :style="computedWidth">
    
    <v-card-title class="card-header ma-0 pa-0">
      <slot name="header"></slot>
    </v-card-title>

    <v-card-text class="pa-0">
      <slot name="body"></slot>
    </v-card-text>

    <v-card-actions>
      <slot name="footer"></slot>
    </v-card-actions>
    
  </v-card>
</template>

<script>
export default {
  name: "DataContainer",
  props: {
    card: { type: Boolean },
    width: { type: String || Number },
    link: { type: String }
  },
  data: () => ({}),
  computed: {
    elevation() {
      return this.card ? "2" : "0";
    },
    computedWidth() {
      return this.width ? `width: ${this.width}px` : '';
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";
  
  .card-header {
    background-color: $primary !important;
    font-weight: 400;
    height: 55px;
  }
</style>
