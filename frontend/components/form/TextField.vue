<template>
  <v-layout v-if="textFields.length" wrap>
    <v-flex
      v-for="(field, i) in textFields"
      :key="i"
      :class="
        `xs${textFields.length > 2 ? field.size : 12}`
      "
    >
      <v-text-field
        v-model="field.value"
        :autofocus="!i"
        :required="field.required"
        :rules="field.rules"
        :label="field.label"
        :counter="field.counter"
        :type="fieldType(field)"
        :append-icon="revealIcon(field)"
        @click:append="show = !show"
        clearable
      />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "TextField",
  props: {
    textFields: { type: Array }
  },
  data: () => ({
    show: false
  }),
  methods: {
    isPassword(field) {
      return field.field.includes("password");
    },
    fieldType(field) {
      if (this.isPassword(field)) {
        return this.show ? "text" : "password";
      }
      return field.fieldType ? field.fieldType : 'text';
    },
    revealIcon(field) {
      if (this.isPassword(field)) {
        return this.show ? "visibility" : "visibility_off";
      }
      return "";
    }
  },
};
</script>

<style lang="scss" scoped></style>
