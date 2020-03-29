<template>
  <Modal
    :modal="modal"
    type="update"
    width="350"
    title="Mot de passe"
    :headline="$store.state.user.type"
  >
    <template v-slot:body>
      <Form :form="form" @close="close" @confirm="action" :condition="isMatch">
        <template v-slot:bottom>
          <v-text-field
            required
            v-model="password2"
            :rules="rules"
            label="confirmation"
            :type="show ? 'text' : 'password'"
            :append-icon="show ? 'visibility' : 'visibility_off'"
            @click:append="show = !show"
            clearable
          />
        </template>
      </Form>
    </template>
  </Modal>
</template>

<script>
import Modal from "../modal/Modal";
import BaseForm from "../../objects/forms/abstract/BaseForm";
import Form from "../form/Form";

export default {
  name: "PasswordUpdateModal",
  components: { Form, Modal },
  props: {
    modal: { type: Boolean, default: false },
    title: { type: String, default: 'Réinitialisation' }
  },
  data: () => ({
    form: null,
    show: false,
    password2: ""
  }),
  computed: {
    rules() {
      return [v => this.isMatch || "Les mots de passe doivent correspondre"];
    },
    isMatch() {
      if (!this.form) return false;
      let password = this.form.textFields.find(i => i.field === "password");
      return password.value == this.password2;
    }
  },
  methods: {
    action() {
      this.$store.dispatch("user/update", {
        password: this.password2,
        callback: this.close,
      });
    },
    initForm() {
      this.form = new BaseForm({
        store: this.$store,
        fields: ["password"]
      });
    },
    close() {
      this.$emit("close");
    }
  },
  mounted() {
    this.initForm();
  }
};
</script>

<style lang="scss" scoped></style>
