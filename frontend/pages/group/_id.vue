<template>
  <EntityView
    :entity="entity"
    :title="$vuetify.breakpoint.mdAndDown ? entity.name : ''"
    :complement="$vuetify.breakpoint.mdAndDown ? entity.name_complement : ''"
  >
    <template v-slot:header>
      <v-layout class="group-header" row wrap mb-5>
        <v-flex xs8>
          <div
            class="image mb-3"
            :class="[$vuetify.theme.dark ? 'image-dark' : 'image-light']"
            height="300"
          >
            <v-card-title class="pa-4 align-end fill-height">
              <div class="card-title-text">
                <div class="group-name display-3 font-weight-light">
                  {{ entity.name }}
                </div>
                <div
                  v-if="entity.name_complement"
                  class="group-sub headline font-weight-light"
                >
                  {{ entity.name_complement }}
                </div>
                <!--                <div class="group-sub headline font-weight-light">-->
                <!--                  {{ entity.name }}-->
                <!--                </div>-->
              </div>
            </v-card-title>
          </div>
        </v-flex>

        <v-flex v-if="ergos.length" xs4>
          <v-list class="member-list ml-3" height="300" rounded subheader>
            <v-subheader class="headline font-weight-light ml-2">
              <v-icon class="mr-3">mdi-account-entity-outline</v-icon>
              Membres
            </v-subheader>
            <v-list-item-group :color="$colors().primary">
              <v-list-item
                v-for="ergo in ergos"
                :key="ergo.id"
                :class="highlight(ergo.id)"
                :to="makeLink(ergo)"
                class="ml-4"
                :inactive="!ergo.public"
              >
                <v-list-item-avatar>
                  <v-icon>mdi-account-circle-outline</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="ergo.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-flex>
      </v-layout>
    </template>
  </EntityView>
</template>

<script>
import EntityView from "../../components/entities/specific/EntityView";

export default {
  head() {
    return {
      title: `${this.$Settings().siteTitle}: ${this.entity.name}`
    };
  },
  name: "_id",
  components: { EntityView },
  computed: {
    entity() {
      const id = parseInt(this.$route.params.id);
      return this.$store.getters["groups/byId"](id);
    },
    ergos() {
      return this.$store.getters["ergos/members"](this.entity.id);
    },
    selectedId() {
      if (this.$store.state.ergos.selected) {
        return this.$store.state.ergos.selected.id;
      }
    }
  },
  methods: {
    makeLink(entity) {
      return `/ergo/${entity.id}`;
    },
    highlight(id) {
      return id === this.selectedId ? "highlight" : "";
    }
  },
  mounted() {
    setTimeout(() => {
      this.$store.commit("ergos/SET_SELECTED", null);
    }, 2500);
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

$color: rgba(236, 0, 140, 0.53);

.group-header {
  display: flex;
  @media screen and (max-width: $medium) {
    display: none;
  }
}

.highlight {
  background-color: $color;
  transition-property: background-color;
  transition-delay: 1.5s;
  animation: colorchange 3s;
}

@keyframes colorchange {
  0% {
    background-color: initial;
  }
  10% {
    background-color: initial;
  }
  50% {
    background-color: $color;
  }
  100% {
    background-color: initial;
  }
}

.image {
  height: 300px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.image-light {
  background-image: linear-gradient(
    to right,
    #00949e,
    #67acc3,
    #a6c5dd,
    #d9e0ef,
    #ffffff
  );
}

.image-dark {
  background-image: linear-gradient(
    to right,
    #00949e,
    #2d788d,
    #3e5d71,
    #3e4450,
    #303030
  );
}

.member-list {
  margin-top: -10px;
  background-color: transparent;
  border-right: 2px solid rgba(255, 0, 154, 0.35);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.card-title-text {
  display: flex;
  flex-direction: column;
}

.group-name {
  color: white;
}

.group-sub {
  display: block;
  margin-top: 15px;
}
</style>
