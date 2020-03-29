<template>
  <Section :title="code">
    <p>
      {{ text }} <br />
      Redirection dans {{ time }}
      <span @click="time = 60">seconde{{ plural }}</span>
    </p>
  </Section>
</template>

<script>
import Section from "../components/sections/Section";
export default {
  props: ["error"],
  name: "error",
  components: { Section },
  data: () => ({
    time: 3,
    code: "Erreur",
    text: "Une erreur est survenue.",
  }),
  computed: {
    plural() {
      return this.time > 1 ? "s" : "";
    }
  },
  watch: {
    time(newValue, oldValue) {
      if (newValue <= 0) {
        setTimeout(() => {
          this.$router.push("/");
        }, 500);
      }
    }
  },
  methods: {
    initError() {
      if (this.error.statusCode === 404) {
        this.code = "Erreur 404";
        this.text = "La page demandée n'existe pas."
      }
    },
  },
  mounted() {
    this.initError();
    
    setInterval(() => {
      if (this.time > 0) {
        this.time--;
      }
    }, 1000);
  }
};
</script>

<style lang="scss" scoped></style>
