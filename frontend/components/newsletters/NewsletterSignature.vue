<template>
  <v-layout column  class="mt-3">
    <v-flex>
      <v-textarea counter label="Signature" v-model="signature" outlined />
    </v-flex>
    <v-flex>
      <v-layout wrap>
        <v-flex shrink>
          <v-btn
            :disabled="!isValid"
            @click="update"
            color="success"
            outlined
          >
            <v-icon left>mdi-content-save</v-icon>
            Enregistrer
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'NewsletterSignature',
    data: () => ({
      signature: "",
    }),
    computed: {
      isValid() {
        return this.$store.state.application.signature !== this.signature
      },
    },
    methods: {
      update() {
        if (this.isValid) {
          this.$store.dispatch("application/updateSignature", this.signature)
        }
      },
    },
    mounted() {
      this.signature = this.$store.state.application.signature;
    }
  };
</script>

<style lang="scss" scoped>

</style>
