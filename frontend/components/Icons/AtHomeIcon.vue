<template>
  <div class="icons" v-if="isAmbulatory || isAtHome || isBoth">
    <v-icon class="icon" :color="dark ? 'green' : 'white'">mdi-home</v-icon>
    <v-icon v-if="isAmbulatory" class="arrow" :color="arrowColor">
      mdi-arrow-right-bold
    </v-icon>
    <v-icon v-else-if="isAtHome" class="arrow" :color="arrowColor">
      mdi-arrow-left-bold
    </v-icon>
    <v-icon v-else-if="isBoth" class="outlined-fix" :color="arrowColor">
      &#x21C6;
    </v-icon>

    <v-icon
      v-if="isGroup(entity)"
      class="icon"
      :color="dark ? 'gray' : 'white'"
      right
    >
      mdi-office-building
    </v-icon>
    <v-icon v-else class="icon" :color="dark ? 'gray' : 'white'" right>
      mdi-human-male
    </v-icon>
  </div>
</template>

<script>
export default {
  name: "AtHomeIcon",
  props: {
    dark: { type: Boolean, default: false },
    entity: { type: Object }
  },
  computed: {
    isAtHome() {
      return !this.entity.ambulatory && this.entity.at_home;
    },
    isAmbulatory() {
      return !this.entity.at_home && this.entity.ambulatory;
    },
    isBoth() {
      return this.entity.at_home && this.entity.ambulatory;
    },
    arrowColor() {
      return this.dark ? "gray" : "white";
    }
  },
  methods: {
    isGroup(entity) {
      return !entity.hasOwnProperty("group");
    }
  }
};
</script>

<style lang="scss" scoped>
.icons {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
}
.icon {
  font-size: 18px;
}
.arrow {
  font-size: 16px;
  margin-right: -7px;
}

.outlined-fix {
  font-size: 18px;
  margin-right: -6px;
  margin-left: 5px;
  margin-bottom: 3px !important;
}
</style>
