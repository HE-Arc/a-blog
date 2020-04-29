<template>
  <div>
    <ArticleSlide v-if="isPresentation" :article="article" />
    <ArticleDetail v-else :article="article" />
    <navigation-arrows class="navigation-arrows-bottom" :article="article" />
  </div>
</template>

<script>
import ArticleDetail from "../../components/articles/ArticleDetail";
import NavigationArrows from "../../components/widgets/NavigationArrows";
import ArticleSlide from '../../components/articles/ArticleSlide';

export default {
  head() {
    return {
      title: `${this.$Settings().siteTitle}: ${this.article.title}`
    };
  },
  name: "_id",
  components: { ArticleSlide, NavigationArrows, ArticleDetail },
  computed: {
    article() {
      const id = parseInt(this.$route.params.id);
      return this.$store.getters["articles/article"](id);
    },
    //  UNIQUMENT POUR LA PRESENTATION
    category() {
      return this.$store.getters["categories/category"](this.article.category);
    },
    isLogo() {
      return this.category.name == "Présentation" && this.article.weight == 1;
    },
    isPresentation() {
      return this.category.name == "Présentation";
    }
    // END UNIQUMENT POUR LA PRESENTATION
  }
};
</script>

<style lang="scss" scoped>
  
  .navigation-arrows-bottom {
    margin-top: 5em !important;
  }

</style>
