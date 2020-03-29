<template>
  <Section title="Réinitialisation du mot de passe"> </Section>
</template>

<script>
import Section from "../../components/sections/Section";

export default {
  name: "_id",
  components: { Section },
  data: () => ({}),
  mounted() {
    this.$store.commit("user/SET_TOKEN", this.$route.params.token);
    this.$store.commit("user/SET_TYPE", 'initialization');
    this.$router.push("/");
  }
};
</script>

<style lang="scss" scoped></style>
