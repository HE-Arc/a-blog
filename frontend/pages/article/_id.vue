<template>
  <div>
    <navigation-arrows class="navigation-arrows-top" :article="article" />
    <ArticleDetail :article="article" />
    <navigation-arrows class="navigation-arrows-bottom" :article="article" />
  </div>
</template>

<script>
import ArticleDetail from "../../components/articles/ArticleDetail";
import NavigationArrows from "../../components/widgets/NavigationArrows";

export default {
  head() {
    return {
      title: `${this.$Settings().siteTitle}: ${this.article.title}`
    };
  },
  name: "_id",
  components: { NavigationArrows, ArticleDetail },
  computed: {
    article() {
      const id = parseInt(this.$route.params.id);
      return this.$store.getters["articles/article"](id);
    }
  }
};
</script>

<style lang="scss" scoped>
  
  .navigation-arrows-bottom {
    margin-top: 5em !important;
  }
</style>
