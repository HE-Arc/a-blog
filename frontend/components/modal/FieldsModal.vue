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
import Modal from "./Modal";
import Form from '../form/Form';
import Category from '../../objects/Category';

export default {
  name: "FieldsModal",
  components: { Form, Modal },
  props: {
    entity: { type: Object },
    fields: { type: Array },
    dispatch: { type: String },
    title: { type: String },
    modal: { type: Boolean },
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
      this.form = Category.getForm({
        store: this.$store,
        entity: this.entity,
        // exclude:  this.article ? [] : ['category'],
      });

      let cat = this.article
        ? this.$store.getters["articles/category"](this.article.category)
        : this.parent;

      if (this.article) {
        this.form.getField("category").value = cat.name;
        this.form.getField("category").cache = cat.name;
      }

    }
  }
};
</script>

<style lang="scss" scoped></style>
