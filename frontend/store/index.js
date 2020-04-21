export const actions = {
  async nuxtServerInit({ dispatch }, request ) {
    await dispatch("users/fetch");
    await dispatch("articles/fetch");
    await dispatch("categories/fetch");
  }
};
