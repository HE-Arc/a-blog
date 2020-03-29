<template>
  <drawer-base
    link-text="Partie publique"
    link-icon="mdi-home"
    link-to="/"
    content-title=""
    state-getter="SET_ADMIN_DRAWER"
    :state="$store.state.application.adminDrawer"
  >
  </drawer-base>
</template>

<script>
import User from "../drawer/User";
import DrawerBase from "../drawer/DrawerBase";

export default {
  name: "DrawerModerator",
  components: { DrawerBase, User },
  data: () => ({
    elements: [
      { label: "Newsletters", icon: "mdi-email", to: "/manage/newsletters" },
    ]
  })
};
</script>

<style lang="scss" scoped></style>
