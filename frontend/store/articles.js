import Article from "../objects/Article";

const objectName = Article.objectName();
const endpoint = id => Article.endpoint(id);
const form = data => Article.createForm(data);
const create = data => new Article(data);
const deleteDialog = data => Article.deleteDialogOptions(data);

export const state = () => ({
  data: [],
});

export const getters = {
  category: (state, getters, rootState) => id => {
    return rootState.categories.data.find(i => i.id == id);
  }
};

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
};

export const actions = {
  async fetch({ commit }) {
    await this.$axios
      .get(endpoint())
      .then(res => commit("INIT", res.data))
      .catch(err => {
        this.$notifications("error")
      });
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
      .then(res => commit("DELETE", id))
      .catch(err => this.$notifications("error"));
  },
  deleteConfirm({ commit }, data) {
    this.commit("dialog/SET_DIALOG", deleteDialog(data));
  },
};