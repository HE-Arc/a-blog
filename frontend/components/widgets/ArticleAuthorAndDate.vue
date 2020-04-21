<template>
  <v-list-item-subtitle
    class="body-1 font-weight-light"
    v-html="subtitleLine()"
  >
  </v-list-item-subtitle>
</template>

<script>
import Helpers from "../../assets/js/Helpers";

export default {
  name: "ArticleAuthorAndDate",
  props: {
    article: { type: Object },
    small: { type: Boolean }
  },
  methods: {
    subtitleLine() {
      let author = this.$store.getters["users/user"](this.article.author);
      let date = Helpers.dateFr(this.article.created_at);
      let color = `color: ${this.$colors().secondary}`;
      let text = `<b style="${color}">${author.full_name}</b> le <b>${date}</b>`;
      return this.small ? `<small>${text}</small>` : text;
    }
  }
};
</script>

<style lang="scss" scoped></style>
