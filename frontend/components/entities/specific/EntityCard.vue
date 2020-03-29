<template>
  <DataContainer class="card pb-4" :width="width" card>
    <template v-slot:header>
      <entity-card-title :entity="group" />
    </template>

    <template v-slot:body>
      <entity-data-lists :entity="group"/>
    </template>

    <template v-slot:footer></template>
  </DataContainer>
</template>

<script>
import DataContainer from "../DataContainer";
import EntityCardTitle from "./EntityCardTitle";
import EntityDataLists from './EntityDataLists';

export default {
  name: "EntityCard",
  components: {
    DataContainer,
    EntityDataLists,
    EntityCardTitle,
  },
  props: {
    group: { type: Object },
    width: { type: String || Number }
  },
};
</script>

<style lang="scss" scoped>
</style>
