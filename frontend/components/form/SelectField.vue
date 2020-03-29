<template>
  <v-layout v-if="selectFields.length" wrap ma0 pa0>
    <v-flex
      v-for="(select, i) in selectFields"
      :key="i"
      :class="`xs${select.length > 1 ? select.size : 12}`"
    >
<!--      :xs="select.size"-->
      <v-list-item class="pa-0 ma-0">
        <v-select
          v-model="select.value"
          item-text="name"
          :items="select.items"
          :label="select.label"
          :menu-props="{ maxHeight: '400' }"
          :multiple="select.many"
          :rules="select.rules"
          clearable
          chips
        >
          <template v-slot:selection="{ attrs, item, parent, selected }">
            <v-chip
              v-if="item === Object(item)"
              v-bind="attrs"
              :color="`blue lighten-3`"
              :input-value="selected"
              label
              small
            >
              <span>
                {{ item.name }}
              </span>
            </v-chip>
          </template>
        </v-select>
      </v-list-item>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "SelectField",
  props: {
    selectFields: { type: Array }
  }
};
</script>

<style lang="scss" scoped></style>
