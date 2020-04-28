<template>
  <v-expansion-panels elevation="1">
    <v-expansion-panel
      class="list-group-item"
      v-for="article in articles"
      :key="article.id"
    >
      <v-expansion-panel-header class="subtitle-2 pa-0">
        <v-layout pa-3 align-baseline>
          <v-flex xs1 pa-0 ml-1 align-self-center>
            <visibility-icon
              :visible="article.published"
              :highlight="article.highlighted"
              :small="true"
            />
          </v-flex>
          <v-flex xs11 pa-1>
            <span class="article-id body-2">#{{ article.id }}</span>
            <span>{{ article.title }}</span>
          </v-flex>
        </v-layout>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <p class="body-2">
          {{ article.description }}
        </p>
        <v-layout>
          <v-spacer></v-spacer>
          <edit-tools
            :edit="() => $router.push(`/administration/article/${article.id}`)"
            :update="() => (modal = true)"
            :del="deleteArticle"
            :element="article"
          />

          <article-modal
            :article="article"
            :modal="modal"
            @close="modal = false"
          />
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import VisibilityIcon from "../widgets/VisibilityIcon";
import EditTools from "../widgets/EditTools";
import ArticleModal from "../modal/ArticleModal";

export default {
  components: { ArticleModal, EditTools, VisibilityIcon },
  props: {
    category: { type: Object }
  },
  name: "ArticleList",
  data: () => ({
    modal: false
  }),
  computed: {
    articles() {
      return this.$store.state.articles.data.filter(
        i => i.category === this.category.id
      );
    }
  },
  methods: {
    deleteArticle(article) {
      this.$store.dispatch("articles/deleteConfirm", article);
    },
  }
};
</script>

<style lang="scss" scoped>
.edit {
  &:hover {
    color: #2195f3;
  }
}

.properties {
  &:hover {
    color: #2195f3;
  }
}

.trash {
  &:hover {
    color: #ff6160;
  }
}
  
  .article-id {
    color: gray;
  }
</style>
