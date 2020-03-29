<template>
  <v-breadcrumbs class="pl-0 pa-0" :items="breadCrumb">
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
    groups() {
      return this.$store.state.groups.data;
    },
    ergos() {
      return this.$store.state.ergos.data;
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

          case "group":
            this.publicGroups(uri, items);
            break;

          case "ergo":
            this.publicErgos(uri, items);
            break;

          case "search":
            this.publicSearch(items);
            break;

          case "manage":
            this.manage(uri, items);
            break;
        }
      }
      items[items.length - 1].disabled = true;
      items.forEach(item => item['tag'] = 'a');
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

    publicSearch(items) {
      items.push({
        text: "Recherche",
        to: `/search`
      });
    },

    publicGroups(uri, items) {
      this.publicSearch(items);
      let group = this.groups.find(i => i.id === parseInt(uri[1]));
      items.push({
        text: group.name,
        to: `/group/${group.id}`
      });
    },

    publicErgos(uri, items) {
      this.publicSearch(items);
      let ergo = this.ergos.find(i => i.id === parseInt(uri[1]));
      let group = this.groups.find(i => i.id === ergo.group);
      if (group) {
        items.push({
          text: group.name,
          to: `/group/${group.id}`
        });
      }
      items.push({
        text: ergo.name,
        to: `/ergo/${ergo.id}`
      });
    },

    manage(uri, items) {
      items.push({
        text: "Administration",
        href: `/manage`
      });
      uri = uri.splice(1);
      if (uri.length) {
        switch (uri[0]) {
          case "categories":
            items.push({
              text: "Categories",
              to: `/manage/categories`
            });
            break;

          case "article":
            let article = this.articles.find(i => i.id === parseInt(uri[1]));
            items.push({
              text: "Categories",
              to: `/manage/categories`
            });
            items.push({
              text: article.title,
              to: `/manage/article/${article.id}`
            });
            break;

          case "newsletters":
            items.push({
              text: "Newsletters",
              to: `/manage/newsletters`
            });
            break;

          case "externals":
            items.push({
              text: "Externes",
              to: `/manage/externals`
            });
            break;

          case "groups":
            items.push({
              text: "Associations",
              to: `/manage/groups`
            });
            break;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
