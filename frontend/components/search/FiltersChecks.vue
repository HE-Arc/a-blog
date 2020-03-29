<template>
  <v-list flat subheader three-line>
    <v-list-item-group multiple v-model="settings">
      <v-list-item
        @click="
          $store.commit('filters/SET_AT_HOME', !$store.state.filters.atHome)
        "
      >
        <template v-slot:default="{ active }">
          <v-list-item-action>
            <v-checkbox v-model="active"></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>À domicile</v-list-item-title>
            <v-list-item-subtitle
              >Le thérapeute se rend chez le patient.</v-list-item-subtitle
            >
          </v-list-item-content>
        </template>
      </v-list-item>

      <v-list-item
        @click="
          $store.commit(
            'filters/SET_AMBULATORY',
            !$store.state.filters.ambulatory
          )
        "
      >
        <template v-slot:default="{ active }">
          <v-list-item-action>
            <v-checkbox v-model="active"></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Ambulatoire</v-list-item-title>
            <v-list-item-subtitle
              >Le patient se rend chez le thérapeute.</v-list-item-subtitle
            >
          </v-list-item-content>
        </template>
      </v-list-item>
<!--      <v-list-item-->
<!--        @click="-->
<!--          $store.commit(-->
<!--            'filters/SET_ASSOCIATION',-->
<!--            !$store.state.filters.association-->
<!--          )-->
<!--        "-->
<!--      >-->
<!--        <template v-slot:default="{ active }">-->
<!--          <v-list-item-action>-->
<!--            <v-checkbox v-model="active"></v-checkbox>-->
<!--          </v-list-item-action>-->

<!--          <v-list-item-content>-->
<!--            <v-list-item-title>Associations</v-list-item-title>-->
<!--            <v-list-item-subtitle-->
<!--              >Association d'ergothérapeutes.</v-list-item-subtitle-->
<!--            >-->
<!--          </v-list-item-content>-->
<!--        </template>-->
<!--      </v-list-item>-->

<!--      <v-list-item-->
<!--        @click="-->
<!--          $store.commit(-->
<!--            'filters/SET_INDEPENDENT',-->
<!--            !$store.state.filters.independent-->
<!--          )-->
<!--        "-->
<!--      >-->
<!--        <template v-slot:default="{ active }">-->
<!--          <v-list-item-action>-->
<!--            <v-checkbox v-model="active"></v-checkbox>-->
<!--          </v-list-item-action>-->

<!--          <v-list-item-content>-->
<!--            <v-list-item-title>Indépendants</v-list-item-title>-->
<!--            <v-list-item-subtitle-->
<!--              >Egothérapeutes indépendants.</v-list-item-subtitle-->
<!--            >-->
<!--          </v-list-item-content>-->
<!--        </template>-->
<!--      </v-list-item>-->
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: "FiltersChecks",
  props: {
    resetSignal: { type: Number }
  },
  data: () => ({
    settings: [2, 3]
  }),
  computed: {
    atHome: {
      get() {
        this.$store.state.filters.atHome;
      },
      set(value) {
        this.$store.commit("filters/SET_AT_HOME", value);
      }
    },
    ambulatory: {
      get() {
        this.$store.state.filters.ambulatory;
      },
      set(value) {
        this.$store.commit("filters/SET_AMBULATORY", value);
      }
    },
    association: {
      get() {
        this.$store.state.filters.association;
      },
      set(value) {
        this.$store.commit("filters/SET_ASSOCIATION", value);
      }
    },
    independent: {
      get() {
        this.$store.state.filters.independent;
      },
      set(value) {
        this.$store.commit("filters/SET_INDEPENDENT", value);
      }
    }
  },
  watch: {
    resetSignal(newValue) {
      this.settings = [2, 3];
    }
  }
};
</script>

<style lang="scss" scoped></style>
