<template>
  <v-layout class="mt-3">
    <v-flex xs12>
      <v-expansion-panels v-if="newsletters.length" elevation="1">
        <v-expansion-panel v-for="nl in newsletters" :key="nl.id">
          <v-expansion-panel-header>
            <newsletter-element :element="nl" />
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-chip
              v-for="(i, idx) in nl.lists"
              :key="idx"
              class="font-weight-bold mr-1 mb-3"
              color="primary"
            >
              {{ mailinglist(i) }}
            </v-chip>
            <div class="pre-formatted body-2">{{ nl.text_body}}</div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-list-item v-else>
        <v-list-item-subtitle>
          <v-list-item-title class="overline">
            L'historique est vide
          </v-list-item-title>
        </v-list-item-subtitle>
      </v-list-item>
    </v-flex>
  </v-layout>
</template>

<script>
import NewsletterElement from "./NewsletterElement";
export default {
  name: "NewslettersHistory",
  components: { NewsletterElement },
  data: () => ({
    show: []
  }),
  computed: {
    newsletters() {
      let data = this.$store.state.newsletters.data;
      if (!data.length) return [];
      let newsletters = [];
      for (let i = 1; i <= data[data.length - 1].batch; i++) {
        let filtered = data.filter(x => x.batch === i);
        newsletters.push({
          subject: filtered[0].subject,
          from_email: filtered[0].from_email,
          text_body: filtered[0].text_body,
          created_at: filtered[0].created_at,
          batch: filtered[0].batch,
          lists: filtered.map(i => i.mailing_list).sort((a, b) => a - b),
          show: false
        });
      }
      return newsletters;
    }
  },
  methods: {
    mailinglist(id) {
      let ml = this.$store.state.mailinglists.data.find(i => i.id == id).name;
      switch (ml) {
        case "All":
          return "Tous les ergothérapeutes";
        case "All External":
          return "Externes";
        default:
          return ml;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.pre-formatted {
  white-space: pre-wrap;
}
</style>
