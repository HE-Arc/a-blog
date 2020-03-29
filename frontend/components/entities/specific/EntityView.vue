<template>
  <Section :title="title" :complement="complement">
    
    <slot name="header"></slot>

    <v-chip
      class="mb-3 mr-3"
      :color="$colors().blue"
      outlined
      v-for="(specialty, i) in specialties"
      :key="i"
    >
      {{ specialty.name }}
    </v-chip>

    <p>{{ entity.description }}</p>

    <v-layout row wrap class="mt-5">
      <EntityDataLists :entity="entity" :exclude="['specialties']" cards />
    </v-layout>
  </Section>
</template>

<script>
import Section from "../../sections/Section";
import EntityDataLists from "./EntityDataLists";

export default {
  name: "EntityView",
  props: {
    title: { type: String },
    avatar: { type: String },
    complement: { type: String },
    entity: { type: Object }
  },
  components: { EntityDataLists, Section },
  computed: {
    specialties() {
      return this.entity.specialties;
    }
  },
  mounted() {
    this.$Helpers().textElementsColor(this.$vuetify.theme);
  }
};
</script>

<style lang="scss" scoped>
.map {
  background-color: rgba(74, 87, 130, 0.42);
  width: 100%;
  height: 500px;
  border-radius: 10px;
  opacity: 0.3;
}
</style>
