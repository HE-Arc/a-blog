<template>
  <v-list-item two-line @mouseenter="show = true" @mouseleave="show = false">
    <v-list-item-content v-if="isAddress">
      <v-list-item-title>
        <span>{{ entity.address }} {{ entity.number }}</span>
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ entity.zip_code }}, {{ entity.city }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-content v-else>
      <v-list-item-title>
        <span>-</span>
      </v-list-item-title>
    </v-list-item-content>
    <v-list-item-action v-if="isAdmin">
      <!--      <transition name="slideRight">-->
      <data-edit-menu
              v-show="true"
              :element="entity"
              :update="updateAddress"
      />
      <fields-modal
              :entity="entity"
              :modal="modal"
              :fields="['address', 'number', 'zip_code', 'city']"
              :headline="entity.name"
              :dispatch="`${isGroup ? 'groups' : 'ergos'}/update`"
              title="Modification d'une entrée"
              @close="modal = false"
      />
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import DataEditMenu from '../widgets/DataEditMenu';
import FieldsModal from '../../modal/FieldsModal';

export default {
  name: 'EntityInfoListHeader',
  components: { FieldsModal, DataEditMenu },
  props: {
    entity: { type: Object },
  },
  data: () => ({
    show: false,
    modal: false,
  }),
  computed: {
    isGroup() {
      return !this.entity.hasOwnProperty('group');
    },
    isAdmin() {
      return this.$route.path.startsWith('/manage');
    },
    isAddress() {
      return this.entity.address && this.entity.number;
    },
  },
  methods: {
    updateAddress() {
      this.modal = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
