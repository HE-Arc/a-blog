<template>
  <div class="mb-4">
    <slot name="pre-header"></slot>
    <h1 v-if="title" class="mb-4">
      <span class="display-3 font-weight-light">{{ title }}</span>
    </h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Section',
  props: {
    title: { type: String },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

h1 {
  padding-bottom: 5px;
  border-bottom: 1px solid $secondary;
  border-image: linear-gradient(to right, $primary 0%, #ffffff 75%);
  -webkit-border-image: linear-gradient(to right, $primary 0%, #ffffff 75%);
  border-image-slice: 1;
}

.title-sub {
  margin-top: 5px;
  display: block;
}
</style>
