const endpoint = "ergo_search?name=";


export const state = () => ({
  data: []
});

export const mutations = {
  UPDATE(state, data) {
    state.data = data;
  },
  CLEAR(state, id) {
    state.data = [];
  }
};

export const actions = {
  search({ commit }, query) {
    this.$axios
      .get(`${endpoint}${query}`)
      .then(res => commit("UPDATE", res.data))
      .catch(err => this.$notifications("error"));
  }
};

export const getters = {

};
