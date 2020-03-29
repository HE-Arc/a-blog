<template>
    <v-tooltip right v-if="isAdmin && (isPending || isModerator)">
      <template v-slot:activator="{ on }">
        <v-icon class="icon" :color="color" v-on="on">{{ icon }}</v-icon>
      </template>
      <span>{{message}}</span>
    </v-tooltip>
</template>

<script>
export default {
  name: "ModeratorIcon",
  props: {
    element: { type: Object }
  },
  computed: {
    isAdmin() {
      return this.$route.path.startsWith("/manage");
    },
    isPending() {
      return this.element.is_pending_moderator;
    },
    isModerator() {
      return this.element.is_moderator;
    },
    icon() {
      return this.isPending ? "mdi-timer-sand-empty" : "mdi-crown";
    },
    color() {
      return this.isPending ? "green" : "orange";
    },
    message() {
      return this.isPending ? "En attente de confirmation": "Modérateur";
    }
  }
};
</script>

<style lang="scss" scoped>
.icon {
  font-size: 18px;
  margin-bottom: 1px;
}
</style>
