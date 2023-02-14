<template>
  <div v-if="currentInvoice">{{ currentInvoice.invoiceId }}</div>
  <div v-else>404 Нет такого счета</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["SET_CURRENT_INVOICE"]),
  },
  computed: {
    ...mapState(["currentInvoice"]),
  },
  created() {
    this.SET_CURRENT_INVOICE(this.$route.params.id);
  },
};
</script>

<style></style>
