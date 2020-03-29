<template>
  <v-layout
    flex
    class="card-header ml-2 mr-3"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <v-flex xs9 class="card-title" @click="link">
      <fields-modal
        :modal="modal"
        :entity="entity"
        :fields="fields"
        :headline="entity.name"
        :dispatch="`${isGroup ? 'groups' : 'ergos'}/update`"
        @close="modal = false"
        title="Modification d'une entrée"
      />

      <v-tooltip v-if="entity.name.length >= 29" top>
        <template v-slot:activator="{ on }">
          <span class="title" v-on="on">{{ entity.name }}</span>
        </template>
        <span>{{ entity.name }}</span>
      </v-tooltip>
      <span v-else class="title">{{ entity.name }}</span>
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex v-if="showDelete" xs1 ml-auto align-self="">
      <v-btn icon @click="remove">
        <v-icon color="white">
          mdi-trash-can-outline
        </v-icon>
      </v-btn>
    </v-flex>
    <v-flex v-else xs2 ma-auto align-self="">
      <at-home-icon class="card-icons" :entity="entity" />
    </v-flex>
  </v-layout>
</template>

<script>
import AtHomeIcon from "../../Icons/AtHomeIcon";
import FieldsModal from "../../modal/FieldsModal";

export default {
  name: "EntityCardTitle",
  components: { FieldsModal, AtHomeIcon },
  props: {
    entity: { type: Object }
  },
  data: () => ({
    modal: false,
    hover: false
  }),
  computed: {
    showDelete() {
      return this.isAdmin && this.hover && this.$store.state.auth.user.is_staff;
    },
    isAdmin() {
      return this.$route.path.startsWith("/manage");
    },
    isGroup() {
      return !this.entity.hasOwnProperty("group");
    },
    fields() {
      if (this.isGroup) {
        return ["name", "name_complement", "description", "at_home", "ambulatory"];
      } else {
        let fields = [
          "first_name",
          "last_name",
          "description",
          "at_home",
          "ambulatory",
          "group",
          "specialties"
        ];
        if (this.entity.group) fields.push("is_moderator");
        return fields;
      }
    }
  },
  methods: {
    remove() {
      this.$store.dispatch(
        `${this.isGroup ? "groups" : "ergos"}/deleteConfirm`,
        this.entity
      );
    },
    link() {
      if (!this.isAdmin) {
        let url = `${this.isGroup ? "group" : "ergo"}/${this.entity.id}`;
        this.$router.push(url);
      } else {
        this.modal = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.card-title {
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: white !important;

  span {
    font-weight: 400;
  }
}
</style>
