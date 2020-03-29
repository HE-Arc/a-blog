export const actions = {
  async nuxtServerInit({ dispatch }, request ) {
    // await dispatch("areas/fetch");
    // await dispatch("specialties/fetch");
    await dispatch("articles/fetch");
    await dispatch("categories/fetch");
    // await dispatch("groups/fetch");
    // await dispatch("ergos/fetch");
    // await dispatch("mailinglists/fetch");
    // await dispatch("newsletters/fetch");
    // await dispatch("externals/fetch");
    // await dispatch("application/fetchSignature");
  }
};
