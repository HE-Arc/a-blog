<template>
  <Section title="">

    <MdEditor :article="article"></MdEditor>

  </Section>
</template>

<script>
  import Section from "../../../components/sections/Section";;
  import MdEditor from "../../../components/MdEditor";

  export default {
    layout: "dashboard",
    name: '_id',
    components: { MdEditor, Section },
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
