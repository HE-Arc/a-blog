<template>
  <drawer-base
    link-text="Partie publique"
    link-icon="mdi-home"
    link-to="/"
    content-title="NAVIGATION"
    state-getter="SET_ADMIN_DRAWER"
    :state="$store.state.application.adminDrawer"
  >
    <v-list-item v-for="(element, idx) in elements" :to="element.to" :key="idx">
      <v-list-item-action>
        <v-icon>{{ element.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title> {{ element.label }} </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </drawer-base>
</template>

<script>
import User from "../drawer/User";
import DrawerBase from "../drawer/DrawerBase";

export default {
  name: "DrawerAdmin",
  components: { DrawerBase, User },
  data: () => ({
    elements: [
      { label: "Catégories", icon: "mdi-folder-edit-outline", to: "/manage/categories" },
      { label: "Associations", icon: "mdi-home-city", to: "/manage/groups" },
      { label: "Externes", icon: "mdi-account-multiple", to: "/manage/externals" },
      { label: "Newsletters", icon: "mdi-email", to: "/manage/newsletters" },

    ]
  })
};
</script>

<style lang="scss" scoped></style>
