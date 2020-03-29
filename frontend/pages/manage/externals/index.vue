<template>
  <Section title="Externes">
    <external-view/>
  </Section>
</template>

<script>
  import Section from '../../../components/sections/Section';
  import ExternalView from '../../../components/externals/ExternalView';
  export default {
    layout: 'dashboard',
    name: 'index',
    components: { ExternalView, Section },
  };
</script>

<style lang="scss" scoped>

</style>
