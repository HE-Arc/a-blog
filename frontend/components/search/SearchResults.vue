<template>
  <div>
    <isotope :list="list" :options="options" ref="isotope">
      <entity-card
        class="grid-item"
        :width="width"
        :group="group"
        v-for="group in list"
        :key="group.id + group.name"
      />
    </isotope>
    <div v-show="counter <= 0" class="no-results">
      <p>Aucun resultat !</p>
    </div>
  </div>
</template>

<script>
import EntityCard from "../../components/entities/specific/EntityCard";

export default {
  name: "SearchResults",
  components: { EntityCard },
  props: {
    counters: { type: Object },
    width: { type: String || Number }
  },
  data: () => ({
    list: []
  }),
  watch: {
    groups(newValue) {
      this.list = this.getAll();
    },
    orphans(newValue) {
      this.list = this.getAll();
    }
  },
  computed: {
    isAdmin() {
      return this.$route.path.startsWith("/manage");
    },
    filters() {
      return this.$store.getters["filters/filters"];
    },
    orphans() {
      return this.$store.state.ergos.data.filter(i => !i.group);
    },
    groups() {
      return this.$store.state.groups.data;
    },
    counter() {
      return this.counters.groups + this.counters.orphans;
    },
    options() {
      return {
        itemSelector: ".grid-item",
        masonry: {
          horizontalOrder: true,
          gutter: 10
        },
        transitionDuration: 700,
        // sortBy: ["orphan", "name"],
        sortBy: !this.isAdmin ? ['random'] : ["orphan", "name"],
        sortAscending: true,
        getSortData: {
          id: "id",
          name: item => item.name.toLowerCase(),
          orphan: item => !this.isGroup(item)
        },
        getFilterData: {
          filter: item => {
            return this.filter(item);
          }
        }
      };
    }
  },
  methods: {
    getAll() {
      return [...this.groups, ...this.orphans];
    },
    isGroup(item) {
      return !item.hasOwnProperty("group");
    },
    filter(item) {
      return (
        this.byAtHome(item) &&
        this.byAmbulatory(item) &&
        this.bySpecialty(item) &&
        // this.byAssociation(item) &&
        // this.byIndependent(item) &&
        this.byArea(item) &&
        this.byText(item)
      );
    },
    bySpecialty(item) {
      if (!this.filters.specialty) return true;
      return item.specialties.map(i => i.name).includes(this.filters.specialty);
    },
    byArea(item) {
      if (!this.filters.area) return true;
      return item.areas.map(j => j.name).includes(this.filters.area);
    },
    byText(item) {
      if (!this.filters.text || !this.filters.text.length) return true;
      return item.name.toLowerCase().includes(this.filters.text.toLowerCase());
    },
    byAtHome(item) {
      if (!this.filters.atHome) return true;
      return item.at_home;
    },
    byAmbulatory(item) {
      if (!this.filters.ambulatory) return true;
      return item.ambulatory;
    },
    // byAssociation(item) {
    //   if (!this.filters.association) return true;
    //   return !this.isGroup(item);
    // },
    // byIndependent(item) {
    //   if (!this.filters.independent) return true;
    //   return this.isGroup(item);
    // }
  },
  mounted() {
    this.list = this.getAll();
    this.counters.groups = this.$store.state.groups.data.length;
    this.counters.orphans = this.orphans.length;
    
  }
};
</script>

<style lang="scss" scoped>
.grid-item {
  margin-bottom: 20px;
}

.no-results {
  display: flex;
  height: 400px;
  justify-content: center;
  align-items: center;
}
</style>
