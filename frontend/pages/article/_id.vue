<template>
  <Article :article="article" />
</template>

<script>
import Section from "../../components/sections/Section";
import Article from "../../components/articles/ArticleDetail";

export default {
  head() {
    return {
      title: `${this.$Settings().siteTitle}: ${this.article.title}`,
    };
  },
  name: "_id",
  components: { Article, Section },
  computed: {
    article() {
      const id = parseInt(this.$route.params.id);
      return this.$store.state.articles.data.find(i => i.id === id);
    }
  }
};
</script>

<style lang="scss" scoped></style>
