<template>
  <v-dialog v-model="modal" :width="width" persistent>
    <v-card class="pa-4">
      <v-layout align-center :justify-center="!title">
        <v-icon class="icon">{{ icon }}</v-icon>
        <v-flex xs9 v-if="title">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline font-weight-thin">
                {{ headline }}
              </v-list-item-title>
              <v-list-item-subtitle class="title">
                {{ title }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-flex>
        <v-flex xs9 v-else-if="title === ''"><span></span></v-flex>
      </v-layout>

      <v-card-text>
        <slot name="body"></slot>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Modal",
  props: {
    width: { type: String, default: "600" },
    headline: { type: String },
    title: { type: String },
    modal: { type: Boolean },
    type: { type: String }
  },
  computed: {
    icon() {
      switch (this.type) {
        case "add":
          return "mdi-plus";
        case "update":
          return "mdi-cogs";
        case "edit":
          return "mdi-pencil";
        case "ergo":
          return "mdi-account";

        case "login":
          return "mdi-account-circle-outline";
        case "lost":
          return "mdi-lock-reset";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.icon {
  font-size: 68px;
  /*color: #a5a5a5;*/
  color: $primary;
  font-weight: lighter !important;
}
</style>
