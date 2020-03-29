<template>
  <v-btn v-if="isAdmin" text block color="primary" @click="$emit('openModal')">
    <v-icon left>mdi-plus</v-icon>
    <slot >Ajouter une donnée</slot>
  </v-btn>
</template>

<script>
  export default {
    name: 'DataCreateButton',
    computed: {
      isAdmin() {
        return this.$route.path.startsWith("/manage");
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>
