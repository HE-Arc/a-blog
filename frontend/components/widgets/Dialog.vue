<template>
  <v-dialog v-model="dialog" persistent width="500">
    <v-card class="pa-2">
      <v-card-text v-if="detail !== ''">
        <v-layout justify-space-around>
          <span class="pa-2">
            <v-icon v-if="type === 'warning'" color="orange" class="icon">
              mdi-alert-circle-outline
            </v-icon>
            <v-icon v-if="type === 'danger'" color="error" class="icon">
              mdi-alert-circle-outline
            </v-icon>
          </span>
        </v-layout>

        <v-layout justify-space-around>
          <span class="pa-2 title font-weight-light">
            {{ detail }}
          </span>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-layout justify-center>
          <v-btn color="error darken-1" text @click="cancel">
            <v-icon left class="mb-1">mdi-cancel</v-icon>
            Annuler
          </v-btn>
          <v-btn color="green darken-1" text @click="accept">
            <v-icon left class="mb-1">mdi-check</v-icon>
            Valider
          </v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Dialog",
  data: () => ({}),
  computed: {
    dialog() {
      return this.$store.state.dialog.dialog;
    },
    type() {
      return this.$store.state.dialog.type;
    },
    detail() {
      return this.$store.state.dialog.detail;
    },
    dispatch() {
      return this.$store.state.dialog.dispatch;
    },
    callback() {
      return this.$store.state.dialog.callback;
    }
  },
  methods: {
    closeDialog() {
      this.$store.commit("dialog/CLOSE_DIALOG");
      setTimeout(() => {
        this.$store.commit("dialog/RESET_DIALOG");
      }, 500);
    },
    cancel() {
      this.closeDialog();
    },
    accept() {
      if (this.dispatch) {
        this.$store.dispatch(this.dispatch.action, this.dispatch.arg);
      }
      if (this.callback) {
        this.callback();
      }
      this.closeDialog();
    }
  }
};
</script>

<style lang="scss" scoped>
.icon {
  font-size: 68px;
  font-weight: lighter !important;
}
.detail {
  text-align: center;
}
</style>
