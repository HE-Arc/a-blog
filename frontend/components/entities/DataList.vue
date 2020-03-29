<template>
  <v-card
    v-if="item.data.length || isAdmin"
    :class="{ 'pb-4': card }"
    :elevation="card ? '3' : '0'"
    :max-width="width"
  >
    <v-card-title v-if="item.title" class="caption mt-3 mb-2">
      <v-divider class="mr-3" :color="$colors().secondary" />
      <span :style="`color: ${$colors().secondary}`">
        {{ item.title.toUpperCase() }}
      </span>
      <v-divider class="ml-3" :color="$colors().secondary" />
    </v-card-title>

    <slot v-else name="header"> </slot>

    <v-list-item>
      <v-list-item-avatar v-if="item.icon">
        <v-icon v-text="item.icon"></v-icon>
      </v-list-item-avatar>

      <v-list-item-subtitle v-if="item.data.length">
        <v-list-item-title
          class="body-2"
          v-for="element in item.data"
          :key="element.id"
        >
          <data-element
            :element="element"
            :type="item.type"
            :parent="item.parent"
          />
        </v-list-item-title>
      </v-list-item-subtitle>
      <v-list-item-subtitle v-else-if="isAdmin">
        <v-list-item-title class="caption">
          {{ item.empty }}
          <v-icon v-if="item.type !== 'specialties'" right color="red">
            mdi-alert-circle-outline
          </v-icon>
        </v-list-item-title>
      </v-list-item-subtitle>
    </v-list-item>

    <div v-if="isAdmin">
      <data-create-button
        v-if="item.create"
        class="button mt-3"
        @openModal="openModal"
      >
        {{ item.create }}
      </data-create-button>
      <fields-modal
        v-if="item.type === 'area'"
        :entity="item.parent"
        :modal="areaModal"
        :fields="['areas']"
        :headline="item.parent.name"
        :dispatch="`${isGroup ? 'groups' : 'ergos'}/update`"
        title="Ajout d'une zone de traitement"
        @close="areaModal = false"
      />
      <fields-modal
        v-if="item.type === 'specialty'"
        :entity="item.parent"
        :modal="specialtiesModal"
        :fields="['specialties']"
        :headline="item.parent.name"
        :dispatch="`${isGroup ? 'groups' : 'ergos'}/update`"
        title="Ajout d'une spécialité"
        @close="specialtiesModal = false"
      />
      <ergo-modal
        v-if="item.type === 'member'"
        :parent="item.parent"
        :modal="ergoModal"
        @close="ergoModal = false"
      />
    </div>
  </v-card>
</template>

<script>
import DataCreateButton from "./widgets/DataCreateButton";
import DataElement from "./DataElement";
import ErgoModal from "../modal/ErgoModal";
import FieldsModal from "../modal/FieldsModal";

export default {
  name: "DataList",
  components: { FieldsModal, ErgoModal, DataElement, DataCreateButton },
  props: {
    item: { type: Object },
    card: { type: Boolean },
    width: { type: String || Number }
  },
  data: () => ({
    areaModal: false,
    ergoModal: false,
    specialtiesModal: false
  }),
  computed: {
    isGroup() {
      return !this.item.parent.hasOwnProperty("group");
    },
    isAdmin() {
      return this.$route.path.startsWith("/manage");
    }
  },
  methods: {
    openModal() {
      if (this.item.type === "area") {
        this.areaModal = true;
      } else if (this.item.type === "member") {
        this.ergoModal = true;
      } else if (this.item.type === "specialty") {
        this.specialtiesModal = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
