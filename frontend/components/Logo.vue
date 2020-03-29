<template>
<div>
<!--  <nuxt-link to="/">-->
    <span class="main_title">A Blog</span>
<!--  </nuxt-link>-->
</div>
</template>

<script>
export default {
  name: "Logo",
  components: {},
  props: {
    width: { type: String },
    small: { type: Boolean }
  },
  data: () => ({
    offsetTop: 0
  }),
  computed: {}
};
</script>

<style lang="scss" scoped>
.main_title {
  font-size: 2em;
  font-weight: 200;
}
</style>
