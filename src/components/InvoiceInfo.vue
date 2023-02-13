<template>
  <article class="invoice-item">
    <router-link
      :to="{ name: 'invoice', params: { id: invoice.invoiceId } }"
      class="invoice-link flex"
    >
      <div class="left flex">
        <span class="invoice-id">#{{ invoice.invoiceId }}</span>
        <span class="invoice-time">{{ invoice.paymentDueDate }}</span>
        <span class="invoice-name">{{ invoice.clientName }}</span>
        <span class="invoice-price">{{ invoice.invoiceTotal }} руб.</span>
      </div>
      <div class="right flex">
        <div
          :class="{
            'status-button': true,
            'invoice-status': true,
            pending: invoice.invoicePending,
            paid: invoice.invoicePaid,
            draft: invoice.invoiceDraft,
          }"
        >
          <span v-if="invoice.invoicePending">Подготовка</span>
          <span v-if="invoice.invoicePaid">Оплачено</span>
          <span v-if="invoice.invoiceDraft">Черновик</span>
        </div>
      </div>
    </router-link>
  </article>
</template>

<script>
export default {
  props: ["invoice"],
};
</script>

<style lang="scss" scoped>
.invoice-item {
  background-color: #1e2139;
  border-radius: 10px;
  transition: 0.3s;
  &:hover {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  }
}
.invoice-link {
  padding: 24px;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  text-decoration: none;
  transition: 0.3s;
}
.left {
  gap: 24px;
}
.invoice-status {
  font-size: 16px;
}
</style>
