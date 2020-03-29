import endpoints from "../configs/endpoints";

export const state = () => ({
  publicDrawer: false,
  adminDrawer: true,

  signature: ""
});

export const mutations = {
  SET_PUBLIC_DRAWER(state, value) {
    state.publicDrawer = value;
  },
  SET_ADMIN_DRAWER(state, value) {
    state.adminDrawer = value;
  },
  SET_DRAWERS_TO_DEFAULT(state) {
    state.publicDrawer = false;
    state.adminDrawer = true;
  },

  SET_SIGNATURE(state, value) {
    state.signature = value;
    this.$notifications("success", "Signature mise à jour");
  }
};

export const actions = {
  async fetchSignature({ commit }) {
    await this.$axios
      .get(endpoints.signature)
      .then(res => commit("SET_SIGNATURE", res.data[0].signature))
      .catch(err => this.$notifications("error"));
  },
  updateSignature({ commit }, value) {
    this.$axios
      .patch(`${endpoints.signature}/1`, { signature: value })
      .then(res => commit("SET_SIGNATURE", res.data.signature))
      .catch(err => this.$notfication("error"));
  }
};
