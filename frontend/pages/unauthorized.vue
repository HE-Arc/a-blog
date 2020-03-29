<template>
  <Section title="Nop !">
    <p>Accès non authorisé.
       Redirection dans {{ time }} seconde{{ plural }}</p>
  </Section>
</template>

<script>
import Section from '../components/sections/Section';
export default {
  name: "unauthorized",
  components: {Section},
  data: () => ({
    time: 3
  }),
  computed: {
    plural() {
      return this.time > 1 ? "s" : "";
    },
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
  mounted() {
    setInterval(() => {
      if (this.time > 0) {
        this.time--;
      }
    }, 1000);
  }
};
</script>

<style lang="scss" scoped></style>
