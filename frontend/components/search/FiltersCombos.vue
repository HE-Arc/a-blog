<template>
  <div>
    <v-list-item class="pl-2">
      <v-select
        :items="specialties"
        v-model="specialty"
        label="Spécialité"
        clearable
      ></v-select>
    </v-list-item>

    <v-list-item class="pl-2">
      <v-select
        :items="areas"
        v-model="area"
        label="Zone de traitement"
        clearable
      ></v-select>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: 'FiltersCombos',
  computed: {
    specialties() {
      return this.$store.state.specialties.data.map(i => i.name);
    },
    areas() {
      return this.$store.state.areas.data.map(i => i.name);
    },
    specialty: {
      get() {
        return this.$store.state.filters.specialty;
      },
      set(value) {
        this.$store.commit("filters/SET_SPECIALTY", value)
      }
    },
    area: {
      get() {
        return this.$store.state.filters.area;
      },
      set(value) {
        this.$store.commit("filters/SET_AREA", value)
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
