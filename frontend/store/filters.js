import Category from "../objects/Category";

export const state = () => ({
  atHome: false,
  ambulatory: false,
  // association: false,
  // independent: false,
  specialty: null,
  area: null,
  text: "",

  modal: false
});

export const getters = {
  filters: state => {
    return {
      atHome: state.atHome,
      ambulatory: state.ambulatory,
      // association: state.association,
      // independent: state.independent,
      specialty: state.specialty,
      area: state.area,
      text: state.text
    };
  }
};

export const mutations = {
  RESET(state) {
    state.atHome = false;
    state.ambulatory = false;
    // state.association = false;
    // state.independent = false;
    state.specialty = null;
    state.area = null;
    state.text = "";
  },

  SET_AT_HOME: (state, value) => (state.atHome = value),
  SET_AMBULATORY: (state, value) => (state.ambulatory = value),
  // SET_ASSOCIATION: (state, value) => (state.association = value),
  // SET_INDEPENDENT: (state, value) => (state.independent = value),
  SET_SPECIALTY: (state, value) => (state.specialty = value),
  SET_AREA: (state, value) => (state.area = value),
  SET_TEXT: (state, value) => (state.text = value),

  SET_MODAL: (state, value) => (state.modal = value)
};

export const actions = {};
