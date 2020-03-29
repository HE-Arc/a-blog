<template>
  <Section title="Administration">

  </Section>
</template>

<script>
import Section from "../sections/Section";
export default {
  name: "AdminLanding",
  components: { Section }
};
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";
  
  .icon-btn {
    &:hover {
      cursor: pointer;
    }
  }
  .icon {
    font-size: 64px;
    color: $secondary;
  }
</style>
