<template>
  <div>
    <Welcome />
    <Highlight />
  </div>
</template>

<script>
import Highlight from "../components/sections/Highlight";
import Contact from "../components/sections/Contact";
import Welcome from "../components/sections/Welcome";

export default {
  head() {
    return {
      title: `${this.$Settings().siteTitle}: Accueil`
    };
  },
  components: {  Welcome, Contact, Highlight }
};
</script>

<style lang="scss" scoped></style>
