<template>
  <v-layout v-if="checkBoxes.length" wrap ma0 pa0>
    <v-flex v-for="(box, i) in checkBoxes" :key="i" :class="`xs${box.size}`">
      <v-checkbox
        class="mt-0 pt-0"
        v-model="box.value"
        :label="box.label"
        :disabled="box.disabled"
      />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "CheckBox",
  props: {
    checkBoxes: { type: Array }
  }
};
</script>

<style lang="scss" scoped></style>
