<template>
  <Section>
    <h1 class="display-1 font-weight-light">
      Bienvenue sur "A Blog".
    </h1>
    <div class="mb-4"></div>
    <p class="mt-3 mb-5 main-text">
      Ici, nous avons à faire à un proof concept
      d'un blog auto suffisant et agréable à regarder. Une fois connecté en
      tant qu'administrateur, il est simple et intuitif d'ordonner les catégories
      existantes ou d'en créer de nouvelles. La rédaction d'articles et se fait
      en ligne avec un éditeur dont la preview affiche exactement le résultat tel
      qu'il sera publié.
    </p>
  </Section>
</template>

<script>
import Section from "../sections/Section";
import Helpers from '../../assets/js/Helpers';

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
