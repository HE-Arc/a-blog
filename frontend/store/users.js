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
};

export const actions = {
  async fetch({ commit }) {
    await this.$axios
      .get(User.endpoint())
      .then(res => commit("INIT", res.data))
      .catch(err => this.$notifications("error"));
  },
};
