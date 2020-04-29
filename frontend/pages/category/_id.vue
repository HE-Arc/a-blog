<template>
  <Section :title="category.name">
    <v-container grid-list-xl class="px-0 pt-0">
      <p class="mb-5 main-text">{{ category.description }}</p>
      <v-layout row wrap>
        <v-flex
          v-for="article in articles(category.id)"
          :key="article.id"
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
import Section from "../../components/sections/Section";
import ArticleCard from "../../components/articles/ArticleCard";
import Helpers from '../../assets/js/Helpers';


export default {
  name: "_id",
  components: { ArticleCard, Section },
  head() {
    return {
      title: `${this.$Settings().siteTitle}: ${this.category.name}`
    };
  },
  computed: {
    category() {
      const id = parseInt(this.$route.params.id);
      return this.$store.getters["categories/category"](id);
    }
  },
  methods: {
    articles(id) {
      return this.$store.getters["categories/published"](id);
    }
  },
  mounted() {
    Helpers.textElementsColor(this.$vuetify.theme);
  }
};
</script>

<style lang="scss" scoped>
  .main-text {
    font-size: larger;
    font-weight: 300;
  }
</style>
