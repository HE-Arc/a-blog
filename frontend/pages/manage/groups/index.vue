<template>
  <Section title="Associations d'ergothérapeutes">
    <v-btn outlined dark class="mb-3" color="primary" @click="modal = true">
      <v-icon left>mdi-plus</v-icon>
      Nouvelle entité
    </v-btn>
    <SearchView width="360" />
    <create-entity-modal :modal="modal" @close="modal = false" />
  </Section>
</template>

<script>
import Section from "../../../components/sections/Section";
import SearchView from "../../../components/search/SearchView";
import CreateEntityModal from "../../../components/modal/CreateEntityModal";

export default {
  layout: "dashboard",
  name: "index",
  components: { CreateEntityModal, SearchView, Section },
  data: () => ({
    modal: false
  })
};
</script>

<style lang="scss" scoped></style>
