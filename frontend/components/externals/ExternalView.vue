<template>
  <div>
    <v-btn outlined dark color="primary" class="mb-5" @click="modal = true">
      <v-icon left>mdi-plus</v-icon>
      Ajouter un externe
    </v-btn>

    <fields-modal
      :modal="modal"
      :fields="['email', 'description']"
      @close="modal = false"
      headline=" "
      dispatch="externals/create"
      title="Ajout d'une entité externe"
    />

    <v-layout>
      <v-flex sm12 md10 lg5>
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              label="Recherche"
              :color="$colors().secondary"
              clearable
            ></v-text-field>
          </v-card-title>

          <v-card-text>
            <v-expansion-panels v-if="externals.length" elevation="1">
              <v-expansion-panel v-for="entity in filtered" :key="entity.id">
                <v-expansion-panel-header>
                  <external-element :element="entity" />
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <p class="body-2">
                    {{ entity.description ? entity.description : "-" }}
                  </p>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-list-item v-else>
              <v-list-item-subtitle>
                <v-list-item-title class="overline">
                  Aucune entité externe
                </v-list-item-title>
              </v-list-item-subtitle>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import DataList from "../entities/DataList";
import ExternalElement from "./ExternalElement";
import FieldsModal from "../modal/FieldsModal";
export default {
  name: "ExternalView",
  components: { FieldsModal, ExternalElement, DataList },
  data: () => ({
    modal: false,
    search: ""
  }),
  computed: {
    externals() {
      return this.$store.state.externals.data;
    },
    filtered() {
      return this.search
        ? this.externals.filter(i => i.email.includes(this.search))
        : this.externals;
    }
  },
  methods: {
    getAreas() {
      return {
        type: "external",
        title: "Entités externes",
        empty: "Aucune entité externe",
        icon: "mdi-account-multiple",
        create: "Ajouter un externe",
        data: this.externals,
        parent: this.entity
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
