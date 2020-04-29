<template>
  <v-container>
    <v-layout>
      <v-flex xs8 grow>
        <Article class="article" :article="article" :body="body" />
      </v-flex>

      <v-flex xs4 shrink>
        <v-card class="editor" elevation="0">
            <no-ssr>
              <markdown-editor
                v-model="body"
                :configs="configs"
                ref="markdownEditor"
              />
            </no-ssr>

            <v-layout>
              <v-btn outlined class="mr-1" color="info" @click="modal = true">
                <v-icon>mdi-cogs</v-icon>
              </v-btn>
              <v-btn
                class="mr-1"
                :disabled="disabledSaveButton"
                :color="disabledSaveButton ? 'gray' : 'success'"
                @click="update()"
                outlined
              >
                <v-icon>mdi-content-save</v-icon>
              </v-btn>
              <v-btn
                :disabled="disabledSaveButton"
                :color="disabledSaveButton ? 'gray' : 'error'"
                @click="reset()"
                outlined
              >
                <v-icon>mdi-cancel</v-icon>
              </v-btn>
            </v-layout>
        </v-card>
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

.editor {
  position: sticky;
  top: 123px;
}

.article {
  max-width: 50vw;
}
</style>
