<template>
  <EntityView :title="entity.name" :entity="entity" :avatar="entity.picture"/>
</template>

<script>
import EntityView from '../../components/entities/specific/EntityView';

export default {
  head() {
    return {
      title: `${ this.$Settings().siteTitle }: ${ this.entity.name }`,
    };
  },
  name: '_id',
  components: { EntityView },
  middleware: "hiddenMember",
  data: () => ({}),
  computed: {
    entity() {
      const id = parseInt(this.$route.params.id);
      return this.$store.state.ergos.data.find(i => i.id === id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
