<template>
  <v-layout v-if="imageFields.length" wrap ma0 pa0>
    <v-flex xs12 v-for="(field, i) in imageFields" :key="i">
      <image-upload
        :edit="true"
        @image="saveImage"
        @dropzoneRef="saveDropzone"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import ImageUpload from "../widgets/ImageUpload";
export default {
  name: "ImageField",
  components: { ImageUpload },
  props: {
    imageFields: { type: Array }
  },
  data: () => ({
    image: "",
    dropzoneRef: null,
  }),
  methods: {
    clearDropZone() {
      try {
        this.dropzoneRef.removeAllFiles(true);
      } catch (e) {
        null;
      }
    },
    saveDropzone(dropzoneRef) {
      this.dropzoneRef = dropzoneRef;
    },
    saveImage(file) {
      this.imageFields.forEach(i => i.value = file);
    }
  },
};
</script>

<style lang="scss" scoped></style>
