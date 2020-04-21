<template>
  <Section title="Categories">
    <admin-category-list/>
  </Section>
</template>

<script>
import AdminCategoryList from '../../../components/categories/AdminCategoryList';
import Section from '../../../components/sections/Section';

export default {
  layout: "dashboard",
  name: "index",
  components: { Section, AdminCategoryList },
};
</script>

<style lang="scss" scoped>

</style>
