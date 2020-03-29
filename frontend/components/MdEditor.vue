<template>
  <v-container ma-0 pa-0 grid-list-xl>
    <v-layout>
      <v-flex xs5 shrink mr-2>
        <v-card class="card" elevation="0">
          <v-card-text class="ma-0 pa-0">
            <no-ssr>
              <markdown-editor
                v-model="body"
                :configs="configs"
                ref="markdownEditor"
              />
            </no-ssr>

            <v-layout wrap>
              <v-flex>
                <v-btn outlined color="info" @click="modal = true">
                  <v-icon left>mdi-cogs</v-icon>
                  Propriétés
                </v-btn>
              </v-flex>

              <v-flex>
                <v-btn
                  :disabled="disabledSaveButton"
                  :color="disabledSaveButton ? 'gray' : 'error'"
                  outlined
                  @click="reset()"
                >
                  <v-icon left>mdi-cancel</v-icon>
                  Annuler
                </v-btn>
              </v-flex>

              <v-flex>
                <v-btn
                  :disabled="disabledSaveButton"
                  :color="disabledSaveButton ? 'gray' : 'success'"
                  outlined
                  @click="update()"
                >
                  <v-icon left>mdi-content-save</v-icon>
                  Enregistrer
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs-7>
        <Article class="article" :article="article" :body="body"/>
      </v-flex>
    </v-layout>

    <article-modal :article="article" :modal="modal" @close="modal = false" />
  </v-container>
</template>

<script>
import { mdEditorConf } from "~/configs/md-editor";
import Article from "./articles/ArticleDetail";
import ArticleModal from "./modal/ArticleModal";

export default {
  name: "MdEditor",
  components: { ArticleModal, Article },
  props: {
    article: {
      type: Object
    }
  },
  data: () => ({
    configs: mdEditorConf.configs,
    body: "",
    modal: false
  }),
  computed: {
    disabledSaveButton() {
      return this.body === this.article.body;
    }
  },
  methods: {
    update() {
      let data = { id: this.article.id, body: this.body };
      this.$store.dispatch("articles/update", data);
    },
    reset() {
      this.$store.commit("dialog/SET_DIALOG", {
        type: "warning",
        detail: `Annuler les changements ?`,
        callback: () => {
          this.body = this.article.body;
          this.$notifications("success", "Modifications annulées");
        }
      });
    }
  },
  mounted() {
    this.body = this.article.body === undefined ? "" : this.article.body;
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/articles-style";
@import "../assets/scss/variables";

.card {
  position: sticky;
  top: 123px;
}

.article {
  max-width: 50vw;
}
</style>
