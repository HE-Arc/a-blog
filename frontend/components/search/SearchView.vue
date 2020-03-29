<template>
  <div>
    <v-layout mt-3 justify-center>
      <v-flex class="normal-filters" xs3 grow mt-1 mr-5>
        <SearchOverview :counters="counters" />
        <Filters />
      </v-flex>

      <v-flex xs11 shrink>
        <v-text-field
          v-model="text"
          label="Recherche"
          :color="$colors().secondary"
          clearable
        ></v-text-field>
        <search-results :counters="counters" :width="width" />
      </v-flex>
    </v-layout>
    <Modal :modal="$store.state.filters.modal">
      <template v-slot:body>
        <Filters />
        <v-layout justify-center class="mt-4">
          <v-btn
            @click="() => $store.commit('filters/SET_MODAL', false)"
            text
            color="green darken-1"
          >
            <v-icon left>mdi-check</v-icon>
            Fermer
          </v-btn>
        </v-layout>
      </template>
    </Modal>
  </div>
</template>

<script>
import Filters from "./Filters";
import SearchOverview from "./SearchOverview";
import SearchResults from "./SearchResults";
import Modal from "../modal/Modal";

import { mapState } from "vuex";

export default {
  name: "SearchView",
  components: { Modal, SearchResults, SearchOverview, Filters },
  props: {
    width: { type: String || Number },
    compact: { type: Boolean }
  },
  data: () => ({
    modal: false,
    counters: {
      groups: 0,
      orphans: 0
    }
  }),
  computed: {
    text: {
      get() {
        return this.$store.state.filters.text;
      },
      set(value) {
        this.$store.commit("filters/SET_TEXT", value);
      }
    },
    isotope() {
      return this.$children[3].$refs.isotope;
    },
    ...mapState({
      atHome: state => state.filters.atHome,
      ambulatory: state => state.filters.ambulatory,
      association: state => state.filters.association,
      independent: state => state.filters.independent,
      specialty: state => state.filters.specialty,
      area: state => state.filters.area,
    }),
  },
  watch: {
    text() {
      this.isotope.filter("filter");
    },
    atHome() {
      this.updateFilters();
    },
    ambulatory() {
      this.updateFilters();
    },
    association() {
      this.updateFilters();
    },
    independent() {
      this.updateFilters();
    },
    specialty() {
      this.updateFilters();
    },
    area() {
      this.updateFilters();
    },
  },
  methods: {
    isAdmin() {
      return this.$route.path.startsWith("/manage");
    },
    updateFilters() {
      this.counters.groups = 0;
      this.counters.orphans = 0;
      this.isotope.filter("filter");
      this.isotope.iso.filteredItems.forEach(i => {
        i.sortData.orphan ? this.counters.orphans++ : this.counters.groups++;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.normal-filters {
  display: block;
  @media screen and (max-width: $mobile) {
    display: none;
  }
}
.mobile-filters-btn {
  display: none;

  @media screen and (max-width: $mobile) {
    display: flex;
    z-index: 10;
    position: fixed;
    bottom: 80px;
    left: 20px;
  }
}
</style>
