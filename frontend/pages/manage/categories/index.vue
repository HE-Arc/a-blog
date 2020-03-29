<template>
  <Section title="Categories">
    <category-view/>
  </Section>
</template>

<script>
import CategoryView from '../../../components/categories/CategoryView';
import Section from '../../../components/sections/Section';

export default {
  layout: "dashboard",
  name: "index",
  components: { Section, CategoryView },
};
</script>

<style lang="scss" scoped>

</style>
