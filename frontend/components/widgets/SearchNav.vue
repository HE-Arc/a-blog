<template>
  <div class="search-wrapper">
    <v-autocomplete
      @focus="focusIn()"
      @focusout="focusOut()"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      :color="$colors().secondary"
      label="Rechercher un article"
      v-model="select"
      cache-items
      item-text="title"
      hide-details
      clearable
      auto-select-first
      flat
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            <span class="subtitle-2 font-weight-light">{{ message }}</span>
          </v-list-item-title>
        </v-list-item>
      </template>

      <template slot="item" slot-scope="{ parent, item }">
        <template>
          <v-list-item-avatar>
            <v-img :src="item.image"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="titleLine(parent, item)" />
            <v-list-item-subtitle v-html="subtitleLine(item)" />
          </v-list-item-content>
          <v-list-item-action>
            <at-home-icon :entity="item" dark />
          </v-list-item-action>
        </template>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>

export default {
  name: "SearchNav",
  data: () => ({
    loading: false,
    items: [],
    search: null,
    select: null
  }),
  computed: {
    articles() {
      return this.$store.state.articles.data;
    },
    message() {
      if (!this.search || !this.search.length) {
        return "Commencez à saisir votre recherche.";
        } else {
          return "Aucun résultat";
      }
    }
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
    select(val) {
      if (!val) return;
      let article = this.$store.getters["articles/byName"](val);
      this.$router.push(`/article/${article.id}`)
    }
  },
  methods: {
    focusIn() {},
    focusOut() {
      this.search = "";
    },
    querySelections(val) {
      this.items = this.articles.filter(i =>
        i.title.toLowerCase().includes(val.toLowerCase())
      );
    },
    titleLine(parent, item) {
      let hl = parent.genFilteredText(item.title);
      return this.color(hl);
    },
    subtitleLine(item) {
      let category = this.$store.getters["articles/category"](item.category);
      let author = this.$store.getters["users/user"](item.author);
      return `De <b>${author.short_name}</b> classé dans <b>${category.name}</b>`;
    },
    color(item) {
      return `<span style="color: ${this.$colors().primary}">${item}</span>`;
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.search-wrapper {
  display: flex;
}

.left-btn {
  border-top-left-radius: 45px !important;
  border-bottom-left-radius: 45px !important;
}
</style>
