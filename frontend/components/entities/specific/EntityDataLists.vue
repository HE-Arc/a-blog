<template>
  <div>
    <data-list :item="getInfos()" :card="cards">
      <template v-slot:header>
        <entity-info-list-header :entity="entity" />
      </template>
    </data-list>

    <data-list
      v-if="items.length"
      v-for="(item, i) in items"
      :key="i"
      :item="item"
      :card="cards"
      class="mt-3"
    />
  </div>
</template>

<script>
import EntityInfoListHeader from "./EntityInfoListHeader";
import DataList from "../DataList";

export default {
  name: "EntityDataLists",
  components: { DataList, EntityInfoListHeader },
  props: {
    entity: { type: Object },
    cards: { type: Boolean },
    exclude: { type: Array, default: () => [] }
  },
  computed: {
    specialties() {
      return this.entity.specialties;
    },
    ergos() {
      return this.$store.getters["ergos/members"](this.entity.id);
    },
    items() {
      let items = [];
      if (!this.exclude.includes('areas')) {
        items.push(this.getAreas());
      }
      if (!this.exclude.includes('specialties')) {
        items.push(this.getSpecialties());
      }
      if (this.isAdmin() && !this.entity.hasOwnProperty("group")) {
        items.push(this.getMembers());
      }
      if (!this.isAdmin() && this.$vuetify.breakpoint.mdAndDown) {
        items.push(this.getMembers());
      }
      return items;
    },
  },
  methods: {
    isAdmin() {
      return this.$route.path.startsWith("/manage");
    },
    getInfos() {
      return {
        type: "info",
        parent: this.entity,
        create: false,
        data: [
          {
            field: "phone",
            label: "Numéro de téléphone",
            icon: "mdi-phone",
            name: this.entity.phonePretty,
            link: this.entity.phoneHtml,
            rules: [v => v.length === 10 || "Ce numéro n'est pas valide."],
            counter: 10
          },
          {
            field: "email",
            label: "Adresse email",
            icon: "mdi-email",
            name: this.entity.email,
            link: `mailto:${this.entity.email}`,
            rules: [v => /.+@.+/.test(v) || "L'adresse email n'est pas valide."]
          },
          {
            field: "website",
            label: "Site web",
            icon: "mdi-web",
            name: this.entity.website,
            link: this.entity.website,
            rules: []
          }
        ]
      };
    },
    getAreas() {
      return {
        type: "area",
        title: `Zone${this.entity.areas.length === 1 ? "" : "s"} de traitement`,
        empty: "Aucune zone de traitement.",
        icon: "mdi-map",
        create: "Modifier les zones",
        data: this.entity.areas,
        parent: this.entity
      };
    },
    getSpecialties() {
      return {
        type: "specialty",
        title: `Spécialité${this.specialties.length === 1 ? "" : "s"}`,
        empty: "Aucune spécialité.",
        icon: "mdi-brain",
        create: "Modifier les spécialités",
        data: this.specialties,
        parent: this.entity
      };
    },
    getMembers() {
      return {
        type: "member",
        title: `Membre${this.ergos.length === 1 ? "" : "s"}`,
        empty: "Aucun membre.",
        icon: "mdi-account-circle",
        create: "Ajouter un thérapeute",
        data: this.ergos,
        parent: this.entity
      };
    }
  },
};
</script>

<style lang="scss" scoped></style>
