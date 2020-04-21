<template>
  <Section title="Hilights">
    <v-container grid-list-xl class="px-0 pt-0">
      <v-layout row wrap v-if="highlighted.length">
        <v-flex>
          <article-card :article="highlighted[0]" />
        </v-flex>
      </v-layout>
      <v-layout v-if="highlighted.length" row wrap>
        <v-flex
          v-for="(article, idx) in highlighted.slice(1, highlighted.length)"
          v-if="article.published"
          :key="idx"
          xs12
          sm6
        >
          <article-card :article="article" />
        </v-flex>
      </v-layout>
    </v-container>
  </Section>
</template>

<script>
import Section from "../sections/Section";
import ArticleCard from "../articles/ArticleCard";

export default {
  name: "Highlight",
  components: { Section, ArticleCard },
  data: () => ({
    modal: false,
  }),

  computed: {
    highlighted() {
      const articles = this.$store.state.articles.data;
      return articles.filter(i => i.highlighted);
    }
  }
};
</script>

<style lang="scss" scoped></style>
