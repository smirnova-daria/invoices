<template>
  <main>
    <section class="invoices">
      <div class="container">
        <header class="invoices-header flex">
          <div class="header-left flex-column">
            <h1>Счета</h1>
            <p>Всего {{ invoices.length }} счета(-ов)</p>
          </div>
          <div class="header-right flex">
            <div class="dropdown flex" @click="toggleFilterMenu">
              <span
                >Фильтр по статусу:
                <span v-if="filterValue">{{ filterValue }}</span> &nbsp;</span
              >
              <span v-if="!filterMenu"> &#9662;</span>
              <span v-else> &#9652;</span>
              <ul v-show="filterMenu" class="dropdown-list">
                <li @click="filteredInvoices">Черновик</li>
                <li @click="filteredInvoices">В процессе</li>
                <li @click="filteredInvoices">Оплачен</li>
                <li @click="filteredInvoices">Очистить фильтр</li>
              </ul>
            </div>
            <button @click="newInvoice" class="flex add-btn purple">
              Новый счет
            </button>
          </div>
        </header>
        <section
          v-if="invoices.length !== 0"
          class="invoice-list flex flex-column"
        >
          <InvoiceInfo
            v-for="(invoice, index) in filteredData"
            :key="index"
            :invoice="invoice"
          />
        </section>
        <section v-else class="invoice-list-empty">Список счетов пуст</section>
      </div>
    </section>
  </main>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import InvoiceInfo from "../components/InvoiceInfo.vue";
export default {
  components: { InvoiceInfo },
  data() {
    return {
      filterMenu: false,
      filterValue: null,
    };
  },
  methods: {
    ...mapMutations(["TOGGLE_INVOICE"]),
    toggleFilterMenu() {
      this.filterMenu = !this.filterMenu;
    },
    newInvoice() {
      this.TOGGLE_INVOICE();
    },
    filteredInvoices(e) {
      if (e.target.innerText === "Очистить фильтр") {
        this.filterValue = null;
        return;
      }
      this.filterValue = e.target.innerText;
    },
  },
  computed: {
    ...mapState(["invoices"]),
    filteredData() {
      return this.invoices.filter((invoice) => {
        if (this.filterValue === "Черновик") {
          return invoice.invoiceDraft === true;
        }
        if (this.filterValue === "В процессе") {
          return invoice.invoicePending === true;
        }
        if (this.filterValue === "Оплачен") {
          return invoice.invoicePaid === true;
        }

        return true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  color: #fff;
}
.invoices-header {
  align-items: center;
  justify-content: space-between;
  margin-bottom: 48px;
  .header-left {
    h1 {
      margin-bottom: 16px;
    }
    p {
      font-size: 16px;
    }
  }

  .header-right {
    gap: 32px;
    align-items: center;
  }

  .dropdown {
    position: relative;
    cursor: pointer;
    width: 200px;
    justify-content: end;
  }
  .dropdown-list {
    position: absolute;
    list-style: none;
    display: flex;
    flex-direction: column;
    right: 0;
    top: 35px;
    background-color: #1e2139;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    overflow: hidden;
    li {
      cursor: pointer;
      padding: 10px 16px;
      width: 100%;
      text-align: right;
      transition: 0.3s;

      &:hover {
        color: #1e2139;
        background-color: #fff;
      }
    }
  }
  .add-btn {
    font-size: 16px;
    transition: 0.3s;

    &:hover {
      background-color: #6b50d4;
    }
  }
}
.invoice-list {
  gap: 24px;
}
.invoice-list-empty {
  font-size: 18px;
  text-align: center;
}
</style>
