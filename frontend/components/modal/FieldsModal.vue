<template>
  <Modal
    :modal="modal"
    :title="title"
    :headline="headline"
    type="update"
  >
    <template v-slot:body>
      <Form ref="form" :form="form" @close="close" @confirm="confirm" />
    </template>
  </Modal>
</template>

<script>
import BaseForm from "../../objects/forms/abstract/BaseForm";
import Modal from "./Modal";
import Form from '../form/Form';

export default {
  name: "FieldsModal",
  components: { Form, Modal },
  props: {
    entity: { type: Object },
    fields: { type: Array },
    modal: { type: Boolean },
    dispatch: { type: String },
    title: { type: String },
    headline: { type: String }
  },
  data: () => ({
    form: null,
  }),
  watch: {
    modal(newValue) {
      if (newValue) {
        this.initForm();
      }
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    confirm() {
      let data = this.form.createFormData();
      if (this.entity) {
        data['id'] = this.entity.id;
      }
      this.$store.dispatch(this.dispatch, data);
      this.close();
    },
    initForm() {
      this.form = new BaseForm({
        store: this.$store,
        fields: this.fields,
        entity: this.entity
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
