import User from '../objects/User';


export const state = () => ({
  data: [],
});

export const getters = {
  user: state => id => state.data.find(i => i.id == id)
};

export const mutations = {
  INIT(state, data) {
    data.forEach(i => state.data.push(new User(i)));
  },
  CREATE(state, data) {
    state.data.push(create(data));
    this.$notifications("success", `${User.objectName()} créé`);
  },
  UPDATE(state, data) {
    let object = state.data.find(i => i.id === data.id);
    Object.getOwnPropertyNames(data).forEach(i => (object[i] = data[i]));
    this.$notifications("success", `${User.objectName()} mis à jour`);
  },
  DELETE(state, id) {
    state.data = state.data.filter(i => i.id !== id);
    this.$notifications("success", `${User.objectName()} supprimé`);
  },
};

export const actions = {
  async fetch({ commit }) {
    await this.$axios
      .get(User.endpoint())
      .then(res => commit("INIT", res.data))
      .catch(err => this.$notifications("error"));
  },
  create({ commit }, data) {
    this.$axios
      .post(User.endpoint(), User.createForm(data))
      .then(res => commit("CREATE", res.data))
      .catch(err => this.$notifications("error"));
  },
  update({ commit }, data) {
    this.$axios
      .patch(User.endpoint(data.id), data)
      .then(res => commit("UPDATE", res.data))
      .catch(err => this.$notifications("error"));
  },
  delete({ commit }, id) {
    this.$axios
      .delete(User.endpoint(id))
      .then(res => commit("DELETE", id))
      .catch(err => this.$notifications("error"));
  },
  deleteConfirm({ commit }, data) {
    this.commit("dialog/SET_DIALOG", User.deleteDialogOptions(data));
  },
};
