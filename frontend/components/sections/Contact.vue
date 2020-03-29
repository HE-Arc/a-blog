<template>
  <Section title="Contact">
    <h4 class="mb-4 text-xs-center headline font-weight-light">
      Une question ? N'hésitez pas à nous contacter en remplissant le
      formulaire. Nous vous répondrons dans les plus brefs délais.
    </h4>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Nom"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="subject"
        label="Objet"
        :rules="objectRules"
      ></v-text-field>

      <v-textarea
        outlined
        class="my-4"
        v-model="message"
        label="Message"
        :rules="messageRules"
        counter
      />

      <v-btn :disabled="!valid" color="success" class="mr-3" @click="validate">
        <v-icon left>mdi-send</v-icon>
        Envoyer
      </v-btn>
    </v-form>
  </Section>
</template>

<script>
import Section from "../sections/Section";

import endpoints from "../../configs/endpoints";

export default {
  name: "Contact",
  components: { Section },
  data: () => ({
    valid: true,
    name: "",
    objectRules: [v => !!v || "Objet requis"],
    messageRules: [v => !!v || "Message requis"],
    nameRules: [v => !!v || "Nom requis"],
    email: "",
    emailRules: [
      v => !!v || "E-mail requis",
      v => /.+@.+\..+/.test(v) || "Cet E-mail n'est pas valide"
    ],
    subject: "",
    message: ""
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.sendForm();
      }
    },
    reset() {
      this.name = "";
      this.email = "";
      this.subject = "";
      this.message = "";
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
    },
    sendForm() {
      let formData = new FormData();
      let fields = Object.getOwnPropertyNames(this.$data);
      fields.forEach(i => formData.append(i, this.$data[i]));
      this.$axios
        .post(endpoints.contact, formData)
        .then(res => {
          this.$notifications("success", `Message envoyé, merci`);
          this.reset();
        })
        .catch(err => this.$notifications("error"));
    }
  }
};
</script>

<style lang="scss" scoped></style>
