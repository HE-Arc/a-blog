<template>
  <div>
    <v-btn outlined dark color="primary" class="mb-5" @click="modal = true">
      <v-icon left>mdi-plus</v-icon>
      Nouvelle catégorie
    </v-btn>
    <fields-modal
      :modal="modal"
      :fields="['name', 'description', 'published']"
      headline=" "
      dispatch="categories/create"
      title="Création d'une catégorie"
      @close="modal = false"
    />
<!--      :component-data="{ attrs: { wrap: true } }"-->
    <draggable
      tag="v-layout"
      class="categories-container"
      ghost-class="ghost"
      v-model="categories"
      v-bind="dragOptions"
      style="min-height: 10px"
    >
      <div v-for="category in categories" :key="category.id">
        <admin-category-card :category="category"/>
      </div>
    </draggable>
  </div>
</template>

<script>
import Section from "../../components/sections/Section";
import AdminCategoryCard from "./AdminCategoryCard";
import FieldsModal from "../../components/modal/FieldsModal";

export default {
  name: "CategoryView",
  components: { FieldsModal, AdminCategoryCard, Section },
  data: () => ({
    modal: false
  }),
  computed: {
    dragOptions() {
      return {
        animation: 200,
        disabled: false,
        group: "categories"
      };
    },
    categories: {
      get() {
        return this.$store.state.categories.data;
      },
      set(value) {
        this.$store.dispatch("categories/updateWeight", value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .ghost {
    /*opacity: 0.5;*/
    /*background: #c8ebfb;*/
  }
  
  .categories-container {
    display: flex;
    flex-wrap: wrap;
  }
</style>
