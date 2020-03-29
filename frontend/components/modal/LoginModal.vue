<template>
  <Modal :modal="modal" :type="tab" width="350">
    <template v-slot:body>
      <v-window v-model="tab" class="mt-3">
        <v-window-item :value="'login'">
          <Form :form="loginForm" @close="close" @confirm="loginAction">
            <template v-slot:bottom>
              <v-flex xs12 class="my-4 forgot-pw" style="text-align: center">
                <a @click="tab = 'lost'">Mot de passe oublié ?</a>
              </v-flex>
            </template>
          </Form>
        </v-window-item>

        <v-window-item :value="'lost'">
          <v-flex xs12 mb-3 class="body-1" style="text-align: center">
            Veuillez entrer votre adresse email. Nous vous enverrons un courriel
            pour réinitialiser votre mot de passe.
          </v-flex>
          <Form
            ref="lost"
            :form="lostForm"
            @close="close"
            @confirm="lostAction"
          />
        </v-window-item>
      </v-window>
    </template>
  </Modal>
</template>

<script>
import Modal from "../modal/Modal";
import Form from "../form/Form";
import BaseForm from "../../objects/forms/abstract/BaseForm";
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
      this.lostForm = new BaseForm({
        store: this.$store,
        fields: ["email"]
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
