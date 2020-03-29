<template>
  <dropzone
    ref="dropzone"
    :id="`dropzone${Math.random(100000)}`"
    :options="options"
    acceptedFiles="image/*"
    maxFiles="1"
    v-on:vdropzone-success="success"
  >
  </dropzone>
</template>

<script>
import Dropzone from "nuxt-dropzone";
import "nuxt-dropzone/dropzone.css";

export default {
  name: "ImageUpload",
  components: { Dropzone },
  props: {
    edit: { type: Boolean, default: false }
  },
  data: () => ({
    options: {
      url: "https://httpbin.org/anything",
      thumbnailWidth: 450,
      maxFiles: 1,
      dictDefaultMessage: "Glissez une image ou cliquez ici*"
    }
  }),
  methods: {
    success(file, response) {
      this.$emit("image", file);
    }
  },
  beforeMount() {
    if (this.edit) {
      let base = this.options.dictDefaultMessage.replace("*", "");
      this.options.dictDefaultMessage = `${base} pour remplacer l'image actuelle`;
    }
  },
  mounted() {
    this.$emit("dropzoneRef", this.$refs.dropzone);
  }
};
</script>

<style lang="scss" scoped></style>
