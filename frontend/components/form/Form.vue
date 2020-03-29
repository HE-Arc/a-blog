<template>
  <v-form ref="form" @keyup.native.enter="isValid && keyenter ? confirmAction() : null">
    <v-container fluid grid-list-sm class="pa-0">
      <check-box :check-boxes="form.checkBoxes" class="mt-4" />
      <text-field :text-fields="form.textFields" class="mt-1" />
      <select-field :select-fields="form.selectFields" class="mt-2" />
      <text-area :text-areas="form.textAreas" class="mt-2" />
      <image-field ref="img" :image-fields="form.imageFields" class="mt-1" />
      
      <slot name="bottom"></slot>
      
      <v-layout justify-center class="mt-4">
        <v-btn @click="closeAction" color="error darken-1" text>
          <v-icon left>mdi-cancel</v-icon>
          Annuler
        </v-btn>
        <v-btn
          text
          color="green darken-1"
          @click="confirmAction"
          :color="confirmationButtonColor"
          :disabled="!isValid"
        >
          <v-icon left>mdi-check</v-icon>
          Valider
        </v-btn>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import CheckBox from "./CheckBox";
import TextField from "./TextField";
import SelectField from "./SelectField";
import ImageField from './ImageField';
import TextArea from './TextArea';

export default {
  name: "Form",
  components: { TextArea, ImageField, SelectField, TextField, CheckBox },
  props: {
    form: { type: Object },
    loading: { type: Boolean, default: false },
    condition: { type: Boolean, default: true },
    keyenter: { type: Boolean, default: true },
  },
  data: () => ({}),
  computed: {
    isValid() {
      return this.form.isValid && this.form.isDirty && this.condition;
    },
    confirmationButtonColor() {
      let color = this.isValid ? "green" : "gray";
      return `${color} darken-1`;
    }
  },
  methods: {
    closeAction() {
      this.resetValidation();
      this.$refs.img.clearDropZone();
      this.$emit("close");
    },
    confirmAction() {
      this.$emit("confirm");
    },
    validate() {
      return this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  },
};
</script>

<style lang="scss" scoped></style>
