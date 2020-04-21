<template>
  <span>
    <v-icon v-if="highlight" :small="small" left class="mb-1" color="#FFD700"
      >mdi-star</v-icon
    >
    <div v-else>
      <v-icon :small="small" v-if="visible" left class="mb-1" color="success"
        >mdi-eye-check-outline</v-icon
      >
      <v-icon :small="small" v-else left class="mb-1" color="red"
        >mdi-eye-off-outline</v-icon
      >
    </div>
  </span>
</template>

<script>
export default {
  name: "VisibilityIcon",
  props: {
    visible: { type: Boolean },
    highlight: { type: Boolean, default: false },
    small: { type: Boolean, default: false }
  }
};
</script>

<style lang="scss" scoped></style>
