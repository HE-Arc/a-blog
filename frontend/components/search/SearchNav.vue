<template>
  <div class="search-wrapper">
    <v-autocomplete
      @focus="focusIn()"
      @focusout="focusOut()"
      v-model="selected"
      :loading="loading"
      :search-input.sync="search"
      :items="items"
      :color="$colors().secondary"
      item-text="name"
      flat
      return-object
      hide-details
      auto-select-first
      clearable
      label="Rechercher un article"
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            <span class="subtitle-2 font-weight-light">{{ message }}</span>
          </v-list-item-title>
        </v-list-item>
      </template>

      <template slot="item" slot-scope="{ parent, item, tile }">
        <template v-if="haveGroup(item)">
          <v-list-item-avatar>
            <v-icon>mdi-account-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="item.group.name" />
            <v-list-item-subtitle v-html="nameLine(parent, item, true)" />
            <v-list-item-subtitle v-html="addressLine(item.group)" />
          </v-list-item-content>
          <v-list-item-action>
            <at-home-icon :entity="item.group" dark/>
          </v-list-item-action>
        </template>

        <template v-else-if="isGroup(item)">
          <v-list-item-avatar>
            <v-icon>mdi-account-group-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="nameLine(parent, item)" />
            <v-list-item-subtitle v-html="addressLine(item)" />
          </v-list-item-content>
          <v-list-item-action>
            <at-home-icon :entity="item" dark/>
          </v-list-item-action>
        </template>

        <template v-else>
          <v-list-item-avatar>
            <v-icon>mdi-account-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="nameLine(parent, item)" />
            <v-list-item-subtitle v-html="addressLine(item)" />
          </v-list-item-content>
          <v-list-item-action>
            <at-home-icon :entity="item" dark/>
          </v-list-item-action>
        </template>
      </template>
    </v-autocomplete>

  </div>
</template>

<script>
import Filters from "./Filters";
import AtHomeIcon from "../Icons/AtHomeIcon";

export default {
  name: "SearchNav",
  components: { AtHomeIcon, Filters },
  data: () => ({
    filters: {
      atHome: false,
      ambulatory: false,
      specialty: null,
      area: null
    },
    endpoint: "ergo_search?name=",
    minChars: 2,
    delay: 500,
    timer: null,

    delta: 0,
    search: null,
    lastQuery: null,
    loading: false,

    rawItems: [],
    selected: null
  }),
  computed: {
    items: {
      get() {
        this.applyFilters();
        return this.rawItems;
      },
      set(value) {
        this.rawItems = value;
      }
    },
    message() {
      if (!this.search || !this.search.length) {
        return "Commencez à saisir votre recherche.";
      } else if (this.search.length === 1) {
        return "Deux caractère au minimum.";
      } else {
        if (this.delta < this.delay || this.loading) {
          return "Recherche ...";
        } else {
          return "Aucun résultat";
        }
      }
    }
  },
  watch: {
    search(newVal) {
      this.search = newVal;
      this.delta = 0;
    },
    selected(newVal) {
      if (newVal) {
        let path;
        if (this.isGroup(newVal)) {
          path = `/group/${newVal.id}`;
        } else if (this.haveGroup(newVal)) {
          path = `/group/${newVal.group.id}`;
          this.$store.commit("ergos/SET_SELECTED", newVal);
        } else {
          path = `/ergo/${newVal.id}`;
        }
        this.$router.push(path);
      }
    }
  },
  methods: {
    isGroup(entity) {
      return entity.group === undefined;
    },
    haveGroup(entity) {
      return entity.group && entity.group.name.length;
    },
    loop() {
      let condition =
        this.search &&
        this.delta >= this.delay &&
        this.search.length >= this.minChars &&
        !this.search.includes(this.lastQuery);
      if (condition) {
        this.query();
        this.lastQuery = this.search;
      }
      this.delta += 10;
    },
    query() {
      this.loading = true;
      this.$axios.get(`${this.endpoint}${this.search}`).then(res => {
        this.items = [...res.data.ergos, ...res.data.groups];
        this.loading = false;
      });
    },

    focusIn() {
      this.timer = setInterval(() => this.loop(), 10);
    },
    focusOut() {
      clearInterval(this.timer);
      this.reset();
    },
    reset() {
      this.delta = 0;
      this.search = null;
      this.lastQuery = null;
      this.loading = false;
      this.rawItems = [];
      this.selected = null;
    },
    nameLine(parent, item, arrow = false) {
      let hl = parent.genFilteredText(item.name);
      let name = this.color(arrow ? this.drawArrow(hl) : hl);
      return `${name}`;
    },
    drawArrow(item) {
      return `&nbsp; &#8627; ${item}`;
    },
    color(item) {
      return `<span style="color: ${this.$colors().primary}">${item}</span>`;
    },
    addressLine(item) {
      return "";
      // let area = item.area;
      // let address = item.address;
      // return `<small>${address} <b>${area.name}</b></small>`;
    },
    applyFilters() {
      if (this.filters.atHome) {
        this.rawItems = this.rawItems.filter(
          i => i.at_home === this.filters.atHome
        );
      }
      if (this.filters.ambulatory) {
        this.rawItems = this.rawItems.filter(
          i => i.ambulatory === this.filters.ambulatory
        );
      }
      if (this.filters.area) {
        this.rawItems = this.rawItems.filter(i => {
          return i.areas.map(j => j.name).includes(this.filters.area);
        });
      }
      if (this.filters.specialty) {
        this.rawItems = this.rawItems.filter(i => {
          return this.isGroup(i)
            ? i.specialty.map(j => j.name).includes(this.filters.specialty)
            : i.specialty.name === this.filters.specialty;
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.search-wrapper {
  display: flex;
}

.left-btn {
  border-top-left-radius: 45px !important;
  border-bottom-left-radius: 45px !important;
}
</style>
