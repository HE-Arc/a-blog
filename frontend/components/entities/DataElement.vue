<template>
  <div class="line" @mouseenter="show = true" @mouseleave="show = false">
    <div class="name" :class="{ highlighted: isHighlighted }">
      <v-icon class="mr-3" v-if="element.icon" v-text="element.icon" small />
      <a v-if="element.link" :href="element.link"> {{ element.name }}</a>
      <span v-else>- {{ element.name || element.email }}</span>
      <moderator-icon :element="element" />
    </div>

    <data-edit-menu
      v-if="!isExcluded && isAdmin"
      class="actions"
      :style="isModeratorUser ? 'margin-right: 29px;' : ''"
      :element="element"
      :edit="['member'].includes(type) ? editElement : null"
      :update="['info'].includes(type) ? updateElement : null"
      :del="
        ['member', 'external'].includes(type) && !isModeratorUser
          ? deleteElement
          : null
      "
    />
    <div v-if="isAdmin">
      <fields-modal
        v-if="type === 'info'"
        :entity="parent"
        :modal="infoModal"
        :fields="[element.field]"
        :headline="parent.name"
        :dispatch="`${isGroup ? 'groups' : 'ergos'}/update`"
        title="Modification d'une entrée"
        @close="() => (infoModal = false)"
      />

      <ergo-modal
        v-if="type === 'member'"
        :entity="element"
        :modal="ergoModal"
        @close="() => (ergoModal = false)"
      />
    </div>
  </div>
</template>

<script>
import DataEditMenu from "./widgets/DataEditMenu";
import ErgoModal from "../modal/ErgoModal";
import FieldsModal from "../modal/FieldsModal";
import ModeratorIcon from "../Icons/ModeratorIcon";

export default {
  name: "DataElement",
  components: { ModeratorIcon, FieldsModal, ErgoModal, DataEditMenu },
  props: {
    element: {},
    parent: { type: Object },
    type: { type: String }
  },
  data: () => ({
    show: false,
    infoModal: false,
    ergoModal: false
  }),
  computed: {
    isGroup() {
      return !this.parent.hasOwnProperty("group");
    },
    isAdmin() {
      return this.$route.path.startsWith("/manage");
    },
    isExcluded() {
      return ["specialties"].includes(this.type);
    },
    isHighlighted() {
      return this.show && !this.isExcluded && this.isAdmin;
    },
    isModeratorUser() {
      let user = this.$store.state.auth.user;
      return !user.is_staff && user.full_name == this.element.name;
    }
  },
  methods: {
    editElement() {
      if (this.type === "member") {
        this.ergoModal = true;
      }
    },
    updateElement() {
      if (this.type === "info") {
        this.infoModal = true;
      }
    },
    deleteElement() {
      if (this.type === "member") {
        this.$store.dispatch("ergos/deleteConfirm", this.element);
      } else if (this.type === "area") {
        let areas = this.parent.areas
          .map(i => i.id)
          .filter(i => i !== this.element.id);
        let data = { id: this.parent.id, areas: areas };

        if (this.isGroup) {
          this.$store.dispatch("groups/update", data);
        } else {
          this.$store.dispatch("ergos/update", data);
        }
      }
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
  align-content: center !important;

  height: 22px;
  transition: background-color 0.5s;
}

.actions {
  margin-top: -5px;
  margin-left: auto;
}

.fade-enter-active,
.slideInRight,
.fade-leave-active,
.slideOutRight {
  animation-duration: 0.25s;
  animation-fill-mode: both;
}
.fade-enter-active,
.slideInRight {
  animation-name: slideInRight;
}
.fade-leave-active,
.slideOutRight {
  animation-name: slideOutRight;
}
@keyframes slideInRight {
  from {
    opacity: 0;
    visibility: visible;
  }
  to {
    opacity: 1;
  }
}
@keyframes slideOutRight {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
