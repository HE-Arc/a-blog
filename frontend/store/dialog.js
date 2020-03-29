export const state = () => ({
  dialog: false,
  type: "",
  detail: "",
  dispatch: null,
  callback: null,
});

export const mutations = {
  SET_DIALOG(state, obj) {
    state.type = obj.type;
    state.detail = obj.detail;
    state.dispatch = obj.dispatch;
    state.callback = obj.callback;
    state.dialog = true;
  },
  CLOSE_DIALOG(state) {
    state.dialog = false;
  },
  RESET_DIALOG(state) {
    state.type = "";
    state.detail = "";
    state.dispatch = null;
    state.callback = null;
  }
};
