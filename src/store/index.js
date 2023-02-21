import { createStore } from "vuex";
import db from "../firebase/firebaseInit";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

export default createStore({
  state: {
    invoices: [],
    invoiceModal: null,
    popup: null,
    invoicesLoaded: null,
    currentInvoice: null,
    editInvoice: null,
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
    SET_CURRENT_INVOICE(state, payload) {
      const invoice = state.invoices.find((item) => item.invoiceId === payload);
      if (invoice) state.currentInvoice = invoice;
    },
    TOGGLE_EDIT_INVOICE(state) {
      state.editInvoice = !state.editInvoice;
    },
    DELETE_INVOICE(state, payload) {
      state.invoices = state.invoices.filter(
        (invoice) => invoice.docId !== payload
      );
    },
  },
  actions: {
    async GET_INVOICES({ commit, state }) {
      const result = await getDocs(collection(db, "invoices"));

      result.forEach((doc) => {
        if (
          !state.invoices.some((inv) => inv.invoiceId === doc.data().invoiceId)
        ) {
          commit("SET_INVOICES", { ...doc.data(), docId: doc.id });
        }
      });

      commit("INVOICES_LOADED");
    },
    async UPDATE_INVOICE({ commit, dispatch }, { docId, routeId }) {
      commit("DELETE_INVOICE", docId);
      await dispatch("GET_INVOICES");
      commit("TOGGLE_INVOICE");
      commit("TOGGLE_EDIT_INVOICE");
      commit("SET_CURRENT_INVOICE", routeId);
    },
    async DELETE_INVOICE({ commit }, docId) {
      await deleteDoc(doc(db, "invoices", docId));
      commit("DELETE_INVOICE");
    },
  },
  modules: {},
});
