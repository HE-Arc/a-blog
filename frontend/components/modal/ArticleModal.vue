<template>
  <Modal
    :modal="modal"
    :title="`${article ? 'Modification' : 'Ajout'} d'un article`"
    :headline="article ? article.title : parent.name"
    :type="article ? 'update' : 'add'"
    width="600"
  >
    <template v-slot:body>
      <Form ref="form" :form="form" @close="close" @confirm="confirm" />
    </template>
  </Modal>
</template>

<script>
import Modal from "./Modal";
import Form from "../form/Form";
import Article from "../../objects/Article";

export default {
  name: "ArticleModal",
  components: { Form, Modal },
  props: {
    article: { type: Object },
    parent: { type: Object },
    modal: { type: Boolean }
  },
  data: () => ({
    form: null
  }),
  watch: {
    modal(newValue) {
      if (newValue) {
        this.initForm();
      }
    }
  },
  computed: {},
  methods: {
    close() {
      this.$emit("close");
    },
    confirm() {
      let data = this.form.createFormData();
      if (this.article) {
        data["id"] = this.article.id;
        this.$store.dispatch("articles/update", data);
      } else {
        data["category"] = this.parent.id;
        data['body'] = "";
        this.$store.dispatch("articles/create", data);
      }
      this.close();
    },
    initForm() {
      this.form = Article.getForm({
        store: this.$store,
        entity: this.article,
        exclude:  this.article ? [] : ['category'],
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
