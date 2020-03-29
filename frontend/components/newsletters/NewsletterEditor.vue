<template>
  <v-layout column>
    <v-flex>
      <v-text-field clearable v-model="title" label="Titre" required />
      <v-textarea counter label="Contenu" v-model="body" outlined />
    </v-flex>
    <v-flex>
      <v-layout wrap>
        <v-flex shrink>
          <v-btn
            :loading="loading"
            :disabled="!isValid"
            @click="$emit('send', title, body)"
            color="success"
            outlined
          >
            <v-icon left>mdi-send</v-icon>
            Envoyer
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "NewsletterEditor",
  props: {
    valid: { type: Boolean, default: false }
  },
  computed: {
    isValid() {
      return this.title.length > 0 && this.body.length > 0 && this.valid;
    },
    title: {
      get() {
        return this.$store.state.newsletters.title;
      },
      set(value) {
        this.$store.commit("newsletters/UPDATE_TITLE", value);
      }
    },
    body: {
      get() {
        return this.$store.state.newsletters.body;
      },
      set(value) {
        this.$store.commit("newsletters/UPDATE_BODY", value);
      }
    },
    loading() {
      return this.$store.state.mailinglists.loading;
    }
  },
};
</script>

<style lang="scss" scoped></style>
