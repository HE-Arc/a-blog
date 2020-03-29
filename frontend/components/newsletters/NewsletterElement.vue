<template>
  <v-layout mr-5 align-center>
    <v-flex shrink xs1 mt-1 mb-0 pb-0 class="batch">#{{ element.batch }}</v-flex>
    <v-flex grow mt-1 mb-0 pb-0 class="subtitle-1">{{ element.subject }}</v-flex>
    <v-flex shrink mt-1 mb-0 pb-0 class="">{{ date }}</v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "NewsletterElement",
  props: {
    element: { type: Object }
  },
  data: () => ({
    show: false
  }),
  computed: {
    isHighlighted() {
      return this.show;
    },
    date() {
      return this.$moment(this.element.created_at).format("Do MMMM YYYY");
    },
    mailinglists() {
      return this.element.mailing_list
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.highlighted {
  color: $secondary;
  transition: color 0.3s;
}

.line {
  display: flex;
  align-items: center;
}
  
  .batch {
    color: gray;
  }
</style>
