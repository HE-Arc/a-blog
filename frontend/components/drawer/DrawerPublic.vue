<template>
  <drawer-base
    link-text="Administration"
    link-icon="mdi-key-variant"
    link-to="/manage"
    content-title="ARTICLES"
    state-getter="SET_PUBLIC_DRAWER"
    :state="$store.state.application.publicDrawer"
    :right="true"
    :temporary="true"
    
  >
    <v-list-group v-for="category in categories" :key="category.id" no-action>
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title v-text="category.name"></v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item
        nuxt
        v-for="article in articles(category.id)"
        :key="article.id"
        tag="a"
        :to="`/article/${article.id}`"
      >
        <v-list-item-content>
          <v-list-item-subtitle v-text="article.title"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      
    </v-list-group>
  </drawer-base>
</template>

<script>
import DrawerBase from "../drawer/DrawerBase";

export default {
  name: "DrawerPublic",
  components: { DrawerBase },

  computed: {
    categories() {
      return this.$store.state.categories.data.filter(i => i.published);
    },
  },
  methods: {
    articles(id) {
      return this.$store.getters["categories/articles"](id).filter(
        i => i.published
      );
    }
  }
};
</script>

<style lang="scss" scoped></style>
