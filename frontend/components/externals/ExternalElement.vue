<template>
  <div class="line">
    <div class="email" :class="{ highlighted: isHighlighted }">
      {{ element.email }}
    </div>
    <div class="menu" @mouseenter="show = true" @mouseleave="show = false">
      <data-edit-menu :edit="edit" :del="del" :element="element" />
    </div>
    <fields-modal
      :modal="modal"
      :fields="['email', 'description']"
      :entity="element"
      :headline="element.email"
      @close="modal = false"
      dispatch="externals/update"
      title="Modification d'une entrée"
    />
  </div>
</template>

<script>
import DataEditMenu from "../entities/widgets/DataEditMenu";
import FieldsModal from '../modal/FieldsModal';
export default {
  name: "ExternalElement",
  components: { FieldsModal, DataEditMenu },
  props: {
    element: { type: Object }
  },
  data: () => ({
    show: false,
    modal: false,
  }),
  computed: {
    isHighlighted() {
      return this.show;
    }
  },
  methods: {
    edit() {
      this.modal = true;
    },
    del(entity) {
      this.$store.dispatch("externals/deleteConfirm", entity);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.highlighted {
  color: $secondary;
  transition: color 0.3s;
}


.line {
  display: flex;
  align-items: center;

  .menu {
    margin-left: auto;
    margin-right: 20px;
  }
}
</style>
