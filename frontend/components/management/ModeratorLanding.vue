<template>
  <Section :title="title">
    <v-container class="mt-5" align-content-center grid-list-xl fluid>
      <v-layout wrap>
        <v-flex>
<!--          <entity-card :group="group" width="400" />-->
        </v-flex>
      </v-layout>
    </v-container>
  </Section>
</template>

<script>
import Section from "../sections/Section";
import EntityCard from '../entities/specific/EntityCard';
export default {
  name: "ModeratorLanding",
  components: { EntityCard, Section },
  
  data: () => ({
    title: "Administration du blog" ,
  }),

};
</script>

<style lang="scss" scoped></style>
