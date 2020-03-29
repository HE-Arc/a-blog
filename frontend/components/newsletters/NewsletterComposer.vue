<template>
  <v-layout class="mt-3">
    <v-flex xs12 sm6>
      <newsletter-editor @send="send" @save="save" :valid="valid" />
    </v-flex>

    <v-flex xs12 sm6 ml-5 shrink>
      <Mailinglists
        :reset="reset"
        @all="value => (this.all = value)"
        @externals="value => (this.externals = value)"
        @group="value => (this.selectedGroups = value)"
        @specialties="value => (this.selectedSpecialties = value)"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import NewsletterEditor from "./NewsletterEditor";
import Mailinglists from "./Mailinglists";

export default {
  name: "NewsletterComposer",
  components: { Mailinglists, NewsletterEditor },
  data: () => ({
    tab: null,
    all: false,
    externals: false,
    selectedGroups: [],
    selectedSpecialties: [],
    reset: false
  }),
  watch: {
    reset(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.reset = false;
        }, 500);
      }
    }
  },
  computed: {
    mailinglists() {
      return this.$store.state.mailinglists.data;
    },
    valid() {
      return (
        [...this.selectedGroups, ...this.selectedSpecialties].length > 0 ||
        this.all ||
        this.externals
      );
    },
    signature() {
      return `\n\n\n${this.$store.state.application.signature}`;
    }
  },
  methods: {
    getData(title, body) {
      let lists = this.externals ? [2] : [];
      if (this.all) {
        lists.push(1);
      } else {
        let find = name => this.mailinglists.find(j => j.name == name);
        lists = [
          ...lists,
          ...this.selectedGroups.map(i => find(i.name).id),
          ...this.selectedSpecialties.map(i => find(i.name).id)
        ];
      }
      return { lists: lists, title: title, body: body + this.signature };
      // this.$store.dispatch("mailinglists/sendNewsletters", data);
    },

    send(title, body) {
      this.$store.commit("dialog/SET_DIALOG", {
        type: "warning",
        detail: `Créér et envoyer la newsletter ?`,
        dispatch: {
          action: `mailinglists/sendNewsletters`,
          arg: this.getData(title, body)
        },
        callback: () => (this.reset = true)
      });
    },
    save() {
      return null;
    }
  }
};
</script>

<style lang="scss" scoped></style>
