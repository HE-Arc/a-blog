<template>
  <Modal :modal="modal" :type="tab" width="350">
    <template v-slot:body>
      <v-window v-model="tab" class="mt-3">
        <v-window-item :value="'login'">
          <Form :form="loginForm" @close="close" @confirm="loginAction"/>
        </v-window-item>
      </v-window>
    </template>
  </Modal>
</template>

<script>
import Modal from "../modal/Modal";
import Form from "../form/Form";
import BaseForm from "../../forms/abstract/BaseForm";
import { mapActions } from "vuex";

export default {
  name: "LoginModal",
  components: { Form, Modal },
  props: {
    modal: { type: Boolean, default: false }
  },
  data: () => ({
    tab: "login",
    loginForm: null,
    lostForm: null
  }),
  computed: {
    loading: {
      get() {
        return this.$store.state.user.loading;
      },
      set(value) {
        this.$store.commit("user/SET_LOADING", value);
      }
    }
  },
  methods: {
    ...mapActions({
      login: "user/login",
      lost: "user/lost",
      update: "user/update"
    }),
    loginAction() {
      this.$store.dispatch("user/login", {
        email: this.loginForm.textFields.find(i => i.field === "email").value,
        password: this.loginForm.textFields.find(i => i.field === "password")
          .value,
        callback: this.close
      });
    },
    lostAction() {
      this.$store.dispatch("user/lost", {
        email: this.lostForm.textFields.find(i => i.field === "email").value,
        callback: this.close
      });
    },
    initForm() {
      this.loginForm = new BaseForm({
        store: this.$store,
        fields: ["email", "password"]
      });
    },
    close() {
      this.tab = "login";
      this.$emit("close");
    }
  },
  mounted() {
    this.initForm();
  }
};
</script>

<style lang="scss" scoped></style>
