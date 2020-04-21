<template>
  <div class="wrapper">
    <v-btn v-if="edit" icon small class="edit" @click.stop="edit(element)">
      <v-icon small>mdi-lead-pencil</v-icon>
    </v-btn>
    <v-btn
      v-if="update"
      icon
      small
      class="properties"
      @click.stop="update(element)"
    >
      <v-icon small>mdi-cogs</v-icon>
    </v-btn>
    <v-btn v-if="del" icon small class="trash" @click.stop="del(element)">
      <v-icon small>
        mdi-trash-can-outline
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "EditTools",
  props: {
    element: { type: Object },
    edit: { type: Function },
    update: { type: Function },
    del: { type: Function }
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  background-color: transparent;

  .edit {
    &:hover {
      color: #2195f3;
    }
  }

  .properties {
    &:hover {
      color: #2195f3;
    }
  }

  .trash {
    &:hover {
      color: #ff6160;
    }
  }
}
</style>
