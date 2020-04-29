import Article from "../objects/Article";

export const state = () => ({
  data: [],
});

export const getters = {
  article: state => id => state.data.find(i => i.id == id),
  byName: state => title => state.data.find(i => i.title == title),
  category: (state, getters, rootState) => id => {
    return rootState.categories.data.find(i => i.id == id);
  },
};

export const mutations = {
  INIT(state, data) {
    data.forEach(i => state.data.push(new Article(i)));
    state.data.sort((a, b) => (a.weight > b.weight ? 1 : -1));
  },
  CREATE(state, data) {
    state.data.push(new Article(data));
    this.$notifications("success", `${Article.objectName()} créé`);
  },
  UPDATE(state, data) {
    let object = state.data.find(i => i.id === data.id);
    Object.getOwnPropertyNames(data).forEach(i => (object[i] = data[i]));
    this.$notifications("success", `${Article.objectName()} mis à jour`);
  },
  DELETE(state, id) {
    state.data = state.data.filter(i => i.id !== id);
    this.$notifications("success", `${Article.objectName()} supprimé`);
  },
};

export const actions = {
  async fetch({ commit }) {
    await this.$axios
      .get(Article.endpoint())
      .then(res => commit("INIT", res.data))
      .catch(err => {
        this.$notifications("error")
      });
  },
  create({ commit }, data) {
    this.$axios
      .post(Article.endpoint(), Article.createForm(data))
      .then(res => commit("CREATE", res.data))
      .catch(err => this.$notifications("error"));
  },
  update({ commit }, data) {
    this.$axios
      .patch(Article.endpoint(data.id), Article.createForm(data))
      .then(res => commit("UPDATE", res.data))
      .catch(err => this.$notifications("error"));
  },
  delete({ commit }, id) {
    this.$axios
      .delete(Article.endpoint(id))
      .then(res => commit("DELETE", id))
      .catch(err => this.$notifications("error"));
  },
  deleteConfirm({ commit }, data) {
    this.commit("dialog/SET_DIALOG", Article.deleteDialogOptions(data));
  },
};
