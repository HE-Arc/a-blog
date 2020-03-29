<template>
  <div>
    <v-list class="pa-0">
      <v-list-item-title class="headline font-weight-light">
        Filtres
      </v-list-item-title>

      <filters-checks
        v-if="sliders"
        :resetSignal="resetSignal"
      />
      <filters-combos/>
    </v-list>

    <v-btn @click="resetFilters()" text small color="info" class="mt-3 pl-2">
      <v-icon left>mdi-replay</v-icon>
      Réinitialiser
    </v-btn>
  </div>
</template>

<script>
import FiltersCombos from "./FiltersCombos";
import FiltersChecks from "./FiltersChecks";
export default {
  name: "Filters",
  components: { FiltersChecks, FiltersCombos },
  props: {
    // filters: { type: Object },
    sliders: { type: Boolean, default: true },
  },
  data: () => ({
    resetSignal: 0
  }),
  methods: {
    resetFilters() {
      this.$store.commit("filters/RESET");
      this.resetSignal++;
    }
  }
};
</script>

<style lang="scss" scoped>
.slider {
  transform: scale(0.9);
  margin-left: -18px;
  margin-bottom: -10px;
}
</style>
