<template>
  <div>
    <v-hover v-slot:default="{ hover }">
      <v-card class="card" :color="color" @click="link(article.id)">
        <v-img height="200px" :src="article.image">
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out darken-2 v-card--reveal display-3 white--text"
              style="height: 100%;"
            >
              En savoir plus...
            </div>
          </v-expand-transition>
        </v-img>
        <v-card-title class="ma-0 pa-2 card-title">
          <v-list-item three-line class="title-container">
            <v-list-item-content>
              <v-list-item-title class="headline font-weight-light">
                <span :style="'color: ' + $colors().primary">{{
                  article.title
                }}</span>
              </v-list-item-title>
              <v-list-item-subtitle class="body-1 font-weight-light">
                {{ article.description }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card-title>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  name: "ArticleCard",
  props: {
    article: { type: Object }
  },
  computed: {
    color() {
      if (this.$vuetify.theme.dark) {
        return "#424242";
      } else {
        return "grey lighten-4";
      }
    }
  },
  methods: {
    link(id) {
      this.$router.push({ path: `/article/${id}` });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

/*.card {*/
/*  margin-right: 10px;*/
/*  margin-bottom: 10px;*/
/*}*/

.title-container {
  overflow: hidden;
  text-overflow: ellipsis;
}

.v-card--reveal {
  align-items: center;
  font-size: 32px !important;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
  background-color: $secondary !important;
}
</style>
