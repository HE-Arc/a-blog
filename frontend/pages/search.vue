<template>
  <Section class="search-section" title="Cabinets">
    <SearchView width="370" />
  </Section>
</template>

<script>
import Section from "../components/sections/Section";
import SearchView from "../components/search/SearchView";

export default {
  head() {
    return {
      title: `${this.$Settings().siteTitle}: Recherche`,
    };
  },
  components: { SearchView, Section },
  name: "search"
};
</script>

<style lang="scss" scoped>
</style>
