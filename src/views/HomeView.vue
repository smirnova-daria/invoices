<template>
  <main>
    <section class="invoices">
      <div class="container">
        <header class="invoices-header flex">
          <div class="header-left flex-column">
            <h1>Счета</h1>
            <p>Всего 4 счета</p>
          </div>
          <div class="header-right flex">
            <div class="dropdown flex" @click="toggleFilterMenu">
              <span>Фильтр по статусу &nbsp;</span>
              <span v-if="!filterMenu"> &#9662;</span>
              <span v-else> &#9652;</span>
              <ul v-show="filterMenu" class="dropdown-list">
                <li>Черновик</li>
                <li>В процессе</li>
                <li>Оплачен</li>
                <li>Очистить фильтр</li>
              </ul>
            </div>
            <button @click="newInvoice" class="flex add-btn purple">
              Новый счет
            </button>
          </div>
        </header>
      </div>
    </section>
  </main>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      filterMenu: false,
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
    border-radius: 20px;
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
</style>
