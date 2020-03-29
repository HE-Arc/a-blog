<template>
  <Section title="Newsletters">
    <v-layout>
      <v-flex md12 lg10>
        <v-container grid-list-lg class="pl-0 ml-0">
          <newsletter-view />
        </v-container>
      </v-flex>
    </v-layout>
  </Section>
</template>

<script>
import NewsletterView from "../../../components/newsletters/NewsletterView";
import Section from "../../../components/sections/Section";

export default {
  components: { Section, NewsletterView },
  layout: "dashboard",
  name: "mailinglist"
};
</script>

<style lang="scss" scoped></style>
