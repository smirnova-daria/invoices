import { createStore } from "vuex";
export default createStore({
  state: {
    invoiceModal: null,
    popup: null,
  },
  mutations: {
    TOGGLE_INVOICE(state) {
      state.invoiceModal = !state.invoiceModal;
    },
    TOGGLE_POPUP(state) {
      state.popup = !state.popup;
    },
  },
  actions: {},
  modules: {},
});
