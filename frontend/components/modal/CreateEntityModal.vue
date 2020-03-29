<template>
  <Modal
    :modal="modal"
    title=" "
    headline="Nouvelle entitée"
    type="add"
  >
    <template v-slot:body>
      <v-container fluid grid-list-sm class="pa-0">
        <v-layout wrap>
          <v-flex xs12>
            <v-radio-group v-model="entityType" column>
              <v-radio label="Association" value="groupForm" />
              <v-radio label="Ergothérapeute indépendant" value="ergoForm" />
            </v-radio-group>
          </v-flex>
        </v-layout>
      </v-container>

      <v-window v-model="entityType">
        <v-window-item :value="'groupForm'">
          <Form
            ref="groupForm"
            :form="groupForm"
            @close="close"
            @confirm="confirm"
          />
        </v-window-item>

        <v-window-item :value="'ergoForm'">
          <Form
            ref="ergoForm"
            :form="ergoForm"
            @close="close"
            @confirm="confirm"
          />
        </v-window-item>
      </v-window>
    </template>
  </Modal>
</template>

<script>
import Modal from "./Modal";
import Form from "../form/Form";
import Ergo from "../../objects/Ergo";
import Group from "../../objects/Group";

export default {
  name: "CreateEntityModal",
  components: { Form, Modal },
  props: {
    modal: { type: Boolean }
  },
  data: () => ({
    form: null,
    entityType: "groupForm",
    groupForm: null,
    ergoForm: null
  }),
  watch: {
    entityType(newValue, oldValue) {
      this.$refs[oldValue].resetValidation();
    }
  },
  computed: {
    isGroup() {
      return this.entityType === "groupForm";
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    confirm() {
      let data = this.isGroup
        ? this.groupForm.createFormData()
        : this.ergoForm.createFormData();
      this.$store.dispatch(`${this.isGroup ? "groups" : "ergos"}/create`, data);
      this.close();
    },
    initForm() {
      this.ergoForm = Ergo.getForm({
        store: this.$store,
        fields: ["first_name", "last_name", "email"]
      });
      this.ergoForm.getField("first_name").size = 12;
      this.ergoForm.getField("last_name").size = 12;
      this.ergoForm.getField("email").size = 12;

      this.groupForm = Group.getForm({
        store: this.$store,
        fields: ["name", "email"]
      });
      this.groupForm.getField("name").size = 12;
      this.groupForm.getField("email").size = 12;
    }
  },
  mounted() {
    this.initForm();
  }
};
</script>

<style lang="scss" scoped></style>
