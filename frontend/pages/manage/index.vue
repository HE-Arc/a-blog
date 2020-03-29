<template>
  <admin-landing v-if="isAdministrator" />
  <moderator-landing v-else-if="isModerator" />
</template>

<script>
import Section from "../../components/sections/Section";
import AdminLanding from "../../components/management/AdminLanding";
import ModeratorLanding from "../../components/management/ModeratorLanding";

export default {
  layout: "dashboard",
  name: "index",
  components: { ModeratorLanding, AdminLanding, Section },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    role() {
      if (this.$store.state.auth.loggedIn) {
        return this.user.is_staff ? "admin" : "moderator";
      }
    },
    isAdministrator() {
      return this.role === "admin";
    },
    isModerator() {
      return this.role === "moderator";
    },
    backgroundColor() {
      return this.$vuetify.theme.dark ? "" : "background-color: white";
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
