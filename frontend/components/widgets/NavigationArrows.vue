<template>
  <v-layout class="wrapper" row wrap justify-center>
    <v-flex shrink>
      <v-tooltip top :color="$colors().primary">
        <template v-slot:activator="{ on }">
          <v-btn
            text
            
            v-on="on"
            :disabled="previousDisabled"
            color="blue-grey"
            class="pa-0 white--text"
            style="font-weight: 300"
            @click="gotoPrevious()"
          >
            <v-icon left dark>mdi-chevron-left</v-icon>
            <span>Article précédent</span>
          </v-btn>
        </template>
        <span>{{ previousArticle ? previousArticle.title : "" }}</span>
      </v-tooltip>
    </v-flex>
    <v-spacer />
    <v-flex shrink>
      <v-tooltip top :color="$colors().primary">
        <template v-slot:activator="{ on }">
          <v-btn
            text
            
            v-on="on"
            :disabled="nextDisabled"
            color="blue-grey"
            class="pa-0 white--text"
            style="font-weight: 300"
            @click="gotoNext()"
          >
            <span>Article suivant</span>
            <v-icon right dark>mdi-chevron-right</v-icon>
          </v-btn>
        </template>
        <span>{{ nextArticle ? nextArticle.title : "" }}</span>
      </v-tooltip>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "NavigationArrows",
  props: {
    article: { type: Object }
  },
  computed: {
    categoryArticles() {
      let category = this.article.category;
      return this.$store.getters["categories/published"](category);
    },
    articleIdx() {
      return this.categoryArticles.indexOf(this.article);
    },
    previousDisabled() {
      return this.articleIdx == 0;
    },
    nextDisabled() {
      return this.articleIdx == this.categoryArticles.length - 1;
    },
    previousArticle() {
      return this.categoryArticles[this.articleIdx - 1];
    },
    nextArticle() {
      return this.categoryArticles[this.articleIdx + 1];
    }
  },
  methods: {
    gotoPrevious() {
      let id = this.previousDisabled ? "" : this.previousArticle.id;
      this.$router.push(`/article/${id}`);
    },
    gotoNext() {
      let id = this.nextDisabled ? "" : this.nextArticle.id;
      this.$router.push(`/article/${id}`);
    }
  }
};
</script>

<style lang="scss" scoped></style>
