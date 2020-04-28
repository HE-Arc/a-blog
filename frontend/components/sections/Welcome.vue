<template>
  <Section>
    <h1 class="display-1 font-weight-light">
      Bienvenue sur mon blog.
    </h1>
    <div class="mb-4"></div>
    <p class="mt-3 main-text">
      Ce blog est un proof concept d'un blog auto suffisant, agréable à regarder
      et simple à utiliser.
    </p>
    <p class="mb-5 main-text">
      Une fois connecté en tant qu'administrateur, il est simple et intuitif
      d'ordonner les catégories existantes ou d'en créer de nouvelles. La
      rédaction d'articles et se fait en ligne grâce à un éditeur dont la
      preview affiche fidèlement le résultat tel qu'il sera publié.
    </p>
  </Section>
</template>

<script>
import Section from "../sections/Section";
import Helpers from "../../assets/js/Helpers";

export default {
  name: "Welcome",
  components: { Section },
  mounted() {
    Helpers.textElementsColor(this.$vuetify.theme);
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

.main-text {
  font-size: larger;
  //color: $secondary;
  /*font-weight: bold;*/
}
</style>
