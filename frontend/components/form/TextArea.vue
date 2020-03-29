<template>
  <v-layout v-if="textAreas.length" wrap>
    <v-flex v-for="(area, i) in textAreas" :key="i" :class="`xs${area.size}`">
      <v-textarea
        :label="area.label"
        :required="area.required"
        :rules="area.rules"
        v-model="area.value"
        :counter="area.counter"
        outlined
      />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "TextArea",
  props: {
    textAreas: { type: Array }
  },
};
</script>

<style lang="scss" scoped></style>
