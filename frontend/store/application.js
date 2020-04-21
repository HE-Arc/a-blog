export const state = () => ({
  publicDrawer: false,
  adminDrawer: true,
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
