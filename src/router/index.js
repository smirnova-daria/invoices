import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import InvoiceView from "../views/InvoiceView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/invoices/:id",
      name: "invoice",
      component: InvoiceView,
    },
  ],
});

export default router;
