import Category from "../objects/Category";

const objectName = Category.objectName();
const endpoint = id => Category.endpoint(id);
const form = data => Category.createForm(data);
const create = data => new Category(data);
const deleteDialog = data => Category.deleteDialogOptions(data);

export const state = () => ({
  data: []
});

export const mutations = {
  INIT(state, data) {
    data.forEach(i => state.data.push(create(i)));
    state.data.sort((a, b) => (a.weight > b.weight ? 1 : -1));
  },
  CREATE(state, data) {
    state.data.push(create(data));
    this.$notifications("success", `${objectName} créé`);
  },
  UPDATE(state, data) {
    let object = state.data.find(i => i.id === data.id);
    Object.getOwnPropertyNames(data).forEach(i => (object[i] = data[i]));
    this.$notifications("success", `${objectName} mis à jour`);
  },
  DELETE(state, id) {
    state.data = state.data.filter(i => i.id !== id);
    this.$notifications("success", `${objectName} supprimé`);
  },
  UPDATE_WEIGHT(state, data) {
    state.data = data;
    for (let i = 0; i < state.data.length; i++) {
      state.data[i].weight = i + 1;
    }
  }
};

export const actions = {
  async fetch({ commit }) {
    await this.$axios
      .get(endpoint())
      .then(res => commit("INIT", res.data))
      .catch(err => this.$notifications("error"));
  },
  create({ commit }, data) {
    this.$axios
      .post(endpoint(), form(data))
      .then(res => commit("CREATE", res.data))
      .catch(err => this.$notifications("error"));
  },
  update({ commit }, data) {
    this.$axios
      .patch(endpoint(data.id), form(data))
      .then(res => commit("UPDATE", res.data))
      .catch(err => this.$notifications("error"));
  },
  delete({ commit }, id) {
    this.$axios
      .delete(endpoint(id))
      .then(() => commit("DELETE", id))
      .catch(err => this.$notifications("error"));
  },
  deleteConfirm({ commit }, data) {
    this.commit("dialog/SET_DIALOG", deleteDialog(data));
  },
  updateWeight({ commit, state }, data) {
    commit("UPDATE_WEIGHT", data);
    state.data.forEach(i => {
      this.$axios
        .patch(endpoint(i.id), form({ weight: i.weight }))
        .then(() =>
          this.$notifications("success", `${objectName} mise à jour`, "once")
        )
        .catch(err =>
          this.$notifications("error", "Une erreur est survenue", "once")
        );
    });
  }
};

export const getters = {
  articles: (state, getters, rootState) => id => {
    return rootState.articles.data.filter(i => i.category === id);
  }
};
