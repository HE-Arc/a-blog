<template>
  <v-list-item class="px-0 mb-4 mt-1" three-line>
    <v-list-item-content>
<!--      <v-list-item-title class="headline font-weight-light mb-1">-->
<!--        Résumé-->
<!--      </v-list-item-title>-->
      <v-list-item-subtitle class="subtitle-1 font-weight-light pl-2">
        <b>{{ counters.groups }}</b> Cabinets
      </v-list-item-subtitle>
<!--      <v-list-item-subtitle class="subtitle-1 font-weight-light pl-2">-->
<!--        <b>{{ counters.orphans }}</b> indépendants-->
<!--      </v-list-item-subtitle>-->
    </v-list-item-content>
  </v-list-item>

</template>

<script>
export default {
  name: "SearchOverview",
  props: {
    counters: { type: Object }
  },
};
</script>

<style lang="scss" scoped></style>
