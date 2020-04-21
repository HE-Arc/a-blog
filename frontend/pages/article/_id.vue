<template>
  <ArticleDetail :article="article" />
</template>

<script>
import ArticleDetail from "../../components/articles/ArticleDetail";

export default {
  head() {
    return {
      title: `${this.$Settings().siteTitle}: ${this.article.title}`
    };
  },
  name: "_id",
  components: { ArticleDetail },
  computed: {
    article() {
      const id = parseInt(this.$route.params.id);
      return this.$store.state.articles.data.find(i => i.id === id);
    }
  }
};
</script>

<style lang="scss" scoped></style>
