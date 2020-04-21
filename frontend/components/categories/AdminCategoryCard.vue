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
        <edit-tools
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
      <v-btn text block color="primary" @click="() => (articleModal = true)">
        <v-icon left>mdi-plus</v-icon>
        <span>Ajouter un article</span>
      </v-btn>
      <article-modal
        :parent="category"
        :modal="articleModal"
        @close="articleModal = false"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import ArticleList from "../articles/ArticleList";
import VisibilityIcon from "../widgets/VisibilityIcon";
import FieldsModal from "../modal/FieldsModal";
import ArticleModal from "../modal/ArticleModal";
import EditTools from '../widgets/EditTools';

export default {
  name: "CategoryCard",
  components: {
    EditTools,
    ArticleModal,
    FieldsModal,
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
