<template>
  <v-breadcrumbs class="pl-0" :items="breadCrumb">
    <template v-slot:divider>
      <v-icon>chevron_right</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: "BreadCrumb",
  data: () => ({}),
  computed: {
    categories() {
      return this.$store.state.categories.data;
    },
    articles() {
      return this.$store.state.articles.data;
    },
    breadCrumb() {
      let items = [{ text: "Accueil", to: "/", link: true, disabled: false }];
      let uri = this.$route.path.split("/").splice(1);

      if (uri.length) {
        switch (uri[0]) {
          case "article":
            this.publicArticles(uri, items);
            break;
          case "category":
            this.publicCategories(uri, items);
            break;
          case "administration":
            this.administration(uri, items);
            break;
        }
      }
      items[items.length - 1].disabled = true;
      items.forEach(item => (item["tag"] = "a"));
      return items;
    }
  },
  methods: {
    publicArticles(uri, items) {
      let article = this.articles.find(i => i.id === parseInt(uri[1]));
      let category = this.categories.find(i => i.id === article.category);
      items.push({
        text: category.name,
        to: `/category/${category.id}`
      });
      items.push({
        text: article.title,
        to: `/article/${article.id}`
      });
    },

    publicCategories(uri, items) {
      let category = this.categories.find(i => i.id === parseInt(uri[1]));
      items.push({
        text: category.name,
        to: `/category/${category.id}`
      });
    },

    administration(uri, items) {
      items.push({
        text: "Administration",
        href: `/administration/categories`
      });
      uri = uri.splice(1);
      if (uri.length) {
        switch (uri[0]) {
          case "categories":
            items.push({
              text: "Categories",
              to: `/administration/categories`
            });
            break;

          case "article":
            let article = this.articles.find(i => i.id === parseInt(uri[1]));
            items.push({
              text: "Categories",
              to: `/administration/categories`
            });
            items.push({
              text: article.title,
              to: `/administration/article/${article.id}`
            });
            break;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
