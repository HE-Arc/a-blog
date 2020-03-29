<template>
  <v-card elevation="0">
    <v-card-title>
      <span class="title font-weight-light">Mailinglists</span>
    </v-card-title>

    <v-card-text>
      <v-list-item>
        <v-checkbox
          class="mb-0 pb-0"
          v-model="externals"
          label="Envoyer aux externes"
        />
      </v-list-item>
      <v-list-item>
        <v-checkbox
          class="my-0 py-0"
          :disabled="
            selectedSpecialties.length > 0 || selectedGroups.length > 0
          "
          v-model="all"
          label="Tous les thérapeutes"
        />
      </v-list-item>
      <v-list-item>
        <v-select
          :disabled="all || selectedSpecialties.length > 0"
          :items="groups"
          item-text="name"
          v-model="selectedGroups"
          label="Associations"
          return-object
          multiple
          clearable
          chips
        >
        </v-select>
      </v-list-item>

      <v-list-item>
        <v-select
          :disabled="all || selectedGroups.length > 0"
          :items="specialties"
          item-text="name"
          v-model="selectedSpecialties"
          label="Spécialités"
          return-object
          multiple
          clearable
          chips
        >
        </v-select>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Mailinglists",
  props: {
    reset: { type: Boolean },
  },
  data: () => ({
    all: false,
    externals: false,
    selectedGroups: [],
    selectedSpecialties: []
  }),
  watch: {
    all(newValue) {
      this.$emit("all", newValue);
    },
    externals(newValue) {
      this.$emit("externals", newValue);
    },
    selectedGroups(newValue) {
      this.$emit("group", newValue);
    },
    selectedSpecialties(newValue) {
      this.$emit("specialties", newValue);
    },
    reset(newValue) {
      if (newValue) {
        this.all = false;
        this.externals = false;
        this.selectedGroups = [];
        this.selectedSpecialties = [];
      }
    }
  },
  computed: {
    groups() {
      return this.$store.state.groups.data;
    },
    specialties() {
      return this.$store.state.specialties.data;
    },
    valid() {
      return [...this.selectedGroups, ...this.selectedSpecialties].length > 0;
    },
  }
};
</script>

<style lang="scss" scoped></style>
