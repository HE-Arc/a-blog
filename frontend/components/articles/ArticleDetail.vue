<template>
  <Section :title="article.title">
    <template v-slot:pre-header>
      <article-author-and-date class="mb-1" :article="article" />
    </template>
    <navigation-arrows class="navigation-arrows-bottom mb-2" :article="article" />
    <v-img
      class="image"
      :class="{ 'place-holder': article.image === 'Url vignette' }"
      height="250"
      :src="article.image"
      :alt="article.title + 'image'"
    />
    <h4 class="mb-5 mt-5 text-xs-center headline font-weight-light">
      {{ article.description }}
    </h4>
    <div class="rendered" v-html="$md.render(body ? body : article.body)"></div>

    <div class="end-line">
      <v-divider class="line mr-4" :color="$colors().secondary" />
      <span :style="`color: ${$colors().secondary}`" class="font-weight-bold">
        FIN
      </span>
      <v-divider class="line ml-4" :color="$colors().secondary" />
    </div>
  </Section>
</template>

<script>
import Section from "../../components/sections/Section";
import Helpers from "../../assets/js/Helpers";
import ArticleAuthorAndDate from "../widgets/ArticleAuthorAndDate";
import Logo from "../Logo";
import NavigationArrows from '../widgets/NavigationArrows';

export default {
  name: "ArticleDetail",
  components: { NavigationArrows, Logo, ArticleAuthorAndDate, Section },
  props: {
    article: { type: Object },
    body: { type: String }
  },
  methods: {
    blockquoteBg() {
      let color = this.$vuetify.theme.dark ? "#303030" : "#fff";
      try {
        document
          .querySelector("blockquote")
          .style.setProperty("--color", color);
      } catch (e) {
        null;
      }
    }
  },
  mounted() {
    this.blockquoteBg();
    Helpers.textElementsColor(this.$vuetify.theme);
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/articles-style";

.logo {
  margin-left: auto;
  margin-right: auto;
}

.image {
  border-radius: 10px;
}

.vignette {
  border-radius: 10px;
}

.place-holder {
  &:before {
    content: "Vignette";
    font-size: 30px;
    position: absolute;
    left: 32%;
    top: 45%;
    letter-spacing: 20px;
    color: white;
  }

  background-color: #ccc;
}

.end-line {
  margin: 100px 40% 40px;
  display: flex;
  align-content: baseline;

  .line {
    margin-top: 10px !important;
  }
}
</style>
