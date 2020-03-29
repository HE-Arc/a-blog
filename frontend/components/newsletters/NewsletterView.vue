<template>
  <v-card min-height="500">
    <v-card-title>
      <v-tabs v-model="tab">
        <v-tab :ripple="false">
          Composition
        </v-tab>
        <v-tab :ripple="false">
          Historique
        </v-tab>
        <v-tab :ripple="false">
          Signature
        </v-tab>
      </v-tabs>
    </v-card-title>

    <v-card-text>
      <v-tabs-items v-model="tab">
        
        <v-tab-item>
          <newsletter-composer/>
        </v-tab-item>
        
        <v-tab-item>
          <newsletters-history/>
        </v-tab-item>
        
        <v-tab-item>
          <newsletter-signature/>
        </v-tab-item>
        
      </v-tabs-items>
    </v-card-text>
  </v-card>

</template>

<script>
import NewsletterComposer from './NewsletterComposer';
import NewslettersHistory from './NewslettersHistory';
import NewsletterSignature from './NewsletterSignature';

export default {
  name: "NewslettersView",
  components: { NewsletterSignature, NewslettersHistory, NewsletterComposer },
  data: () => ({
    tab: null,
  }),
};
</script>

<style lang="scss" scoped></style>
