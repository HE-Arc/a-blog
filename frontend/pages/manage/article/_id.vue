<template>
  <Section title="">

    <MDEditor :article="article"></MDEditor>

  </Section>
</template>

<script>
  import Section from "../../../components/sections/Section";
  import MDEditor from "../../../components/MDEditor";

  export default {
    layout: "dashboard",
    name: '_id',
    components: { MDEditor, Section },
    computed: {
      article() {
        const id = parseInt(this.$route.params.id);
        return this.$store.state.articles.data.find(i => i.id === id);
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
