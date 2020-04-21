<template>
  <drawer-base
    link-text="Partie publique"
    link-icon="mdi-home"
    link-to="/"
    state-getter="SET_ADMIN_DRAWER"
    :state="$store.state.application.adminDrawer"
  >
  </drawer-base>
</template>

<script>
import DrawerBase from "../drawer/DrawerBase";

export default {
  name: "DrawerAdmin",
  components: { DrawerBase },
};
</script>

<style lang="scss" scoped></style>
