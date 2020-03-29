<template>
  <div class="mb-4">
    <h1 v-if="title" class="mb-4">
      <v-avatar v-if="avatar" width="150" height="150">
        <img :src="avatar" alt="Profile picture">
      </v-avatar>
      <span class="title-text font-weight-light display-2">{{ title }}</span>
      <span v-if="complement" class="title-sub font-weight-light title">{{ complement }}</span>
    </h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Section',
  props: {
    title: { type: String },
    complement: { type: String },
    avatar: { type: String },
  },
  mounted() {
    console.log(this.complement)
  }
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
