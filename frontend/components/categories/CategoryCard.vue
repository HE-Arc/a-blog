<template>
  <v-card class="card mr-4 mb-4" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          <visibility-icon :visible="category.published" />
          <span class="category-id body-2">#{{ category.id }}</span>
          <span>{{ category.name }}</span>
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ category.description }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar>
        <data-edit-menu
          style="margin-bottom: 1.2em"
          :element="category"
          :update="() => (categoryModal = true)"
          :del="deleteCategory"
        />
        <fields-modal
          :modal="categoryModal"
          :entity="category"
          :fields="['name', 'description', 'published']"
          :headline="category.name"
          dispatch="categories/update"
          title="Modification d'une catégorie"
          @close="categoryModal = false"
        />
      </v-list-item-avatar>
    </v-list-item>
    <v-card-text>
      <article-list :category="category" />
    </v-card-text>
    <v-card-actions>
      <data-create-button @openModal="articleModal = true">
        Ajouter un article
      </data-create-button>
      <article-modal
        :parent="category"
        :modal="articleModal"
        @close="articleModal = false"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import Article from "../../objects/Article";
import ArticleList from "../articles/ArticleList";
import VisibilityIcon from "../Icons/VisibilityIcon";
import DataCreateButton from "../entities/widgets/DataCreateButton";
import DataEditMenu from "../entities/widgets/DataEditMenu";
import FieldsModal from "../modal/FieldsModal";
import ArticleModal from "../modal/ArticleModal";

export default {
  name: "CategoryCard",
  components: {
    ArticleModal,
    FieldsModal,
    DataEditMenu,
    DataCreateButton,
    VisibilityIcon,
    ArticleList
  },
  props: {
    category: { type: Object }
  },
  data: () => ({
    categoryModal: false,
    articleModal: false
  }),
  methods: {
    deleteCategory() {
      this.$store.dispatch("categories/deleteConfirm", this.category);
    },
    createArticle() {
      let article = new Article();
      article.category = this.category.id;
      return article;
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  cursor: grab;
  max-width: 360px;
}
  .category-id {
    color: gray;
  }
</style>
