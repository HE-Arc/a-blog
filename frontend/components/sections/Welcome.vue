<template>
  <Section title="">
    <h1 class="display-1">
      Bienvenue sur mon blog.
    </h1>
    <div class="mb-4"></div>
    <p class="font-weight-light mt-3">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias aliquam
      cumque cupiditate deleniti dolorem ducimus eaque esse facilis, illum
      maxime, molestias mollitia neque officia quisquam reiciendis tempore ullam
      veritatis?
    </p>
  </Section>
</template>

<script>
import Section from "../sections/Section";

export default {
  name: "Welcome",
  components: { Section },
  mounted() {
    this.$Helpers().textElementsColor(this.$vuetify.theme);
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

h1 {
  color: $secondary;
  padding-bottom: 0;
  border: none !important;
}

.snase {
  color: $secondary;
  font-weight: bold;
}
</style>
