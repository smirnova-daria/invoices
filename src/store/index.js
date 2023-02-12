import { createStore } from "vuex";
import db from "../firebase/firebaseInit";
import { collection, getDocs } from "firebase/firestore";

export default createStore({
  state: {
    invoices: [],
    invoiceModal: null,
    popup: null,
    invoicesLoaded: null,
  },
  mutations: {
    TOGGLE_INVOICE(state) {
      state.invoiceModal = !state.invoiceModal;
    },
    TOGGLE_POPUP(state) {
      state.popup = !state.popup;
    },
    SET_INVOICES(state, payload) {
      state.invoices.push(payload);
    },
    INVOICES_LOADED(state) {
      state.invoicesLoaded = true;
    },
  },
  actions: {
    async GET_INVOICES({ commit, state }) {
      const result = await getDocs(collection(db, "invoices"));

      result.forEach((doc) => {
        if (
          !state.invoices.some((inv) => inv.invoiceId === doc.data().invoiceId)
        ) {
          commit("SET_INVOICES", doc.data());
        }
      });

      commit("INVOICES_LOADED");
    },
  },
  modules: {},
});
