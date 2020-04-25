import Category from "../objects/Category";

export const state = () => ({
  data: []
});

export const getters = {
  articles: (state, getters, rootState) => id => {
    return rootState.articles.data.filter(i => i.category === id);
  }
};

export const mutations = {
  INIT(state, data) {
    data.forEach(i => state.data.push(new Category(i)));
    state.data.sort((a, b) => (a.weight > b.weight ? 1 : -1));
  },
  CREATE(state, data) {
    state.data.push(new Category(data));
    this.$notifications("success", `${Category.objectName()} créé`);
  },
  UPDATE(state, data) {
    let object = state.data.find(i => i.id === data.id);
    Object.getOwnPropertyNames(data).forEach(i => (object[i] = data[i]));
    this.$notifications("success", `${Category.objectName()} mis à jour`);
  },
  DELETE(state, id) {
    state.data = state.data.filter(i => i.id !== id);
    this.$notifications("success", `${Category.objectName()} supprimé`);
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
      .get(Category.endpoint())
      .then(res => commit("INIT", res.data))
      .catch(err => this.$notifications("error"));
  },
  create({ commit }, data) {
    this.$axios
      .post(Category.endpoint(), Category.createForm(data))
      .then(res => commit("CREATE", res.data))
      .catch(err => {
        console.log("error callback")
        this.$notifications("error")
      });
  },
  update({ commit }, data) {
    this.$axios
      .patch(Category.endpoint(data.id), Category.createForm(data))
      .then(res => commit("UPDATE", res.data))
      .catch(err => this.$notifications("error"));
  },
  delete({ commit }, id) {
    this.$axios
      .delete(Category.endpoint(id))
      .then(() => commit("DELETE", id))
      .catch(err => this.$notifications("error"));
  },
  deleteConfirm({ commit }, data) {
    this.commit("dialog/SET_DIALOG", Category.deleteDialogOptions(data));
  },
  updateWeight({ commit, state }, data) {
    commit("UPDATE_WEIGHT", data);
    state.data.forEach(i => {
      this.$axios
        .patch(Category.endpoint(i.id), Category.createForm({ weight: i.weight }))
        .then(() =>
          this.$notifications("success", `${Category.objectName()} mise à jour`, "once")
        )
        .catch(err =>
          this.$notifications("error", "Une erreur est survenue", "once")
        );
    });
  }
};


