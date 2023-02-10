<template>
  <div @click="checkClick" ref="invoiceWrap" class="invoice-wrap">
    <form class="invoice-form" @submit.prevent="submitForm">
      <h2>Новый счет</h2>

      <!-- Bill From  -->
      <div class="form-block">
        <h3 class="form-block-title">От кого</h3>
        <div class="form-row flex">
          <div class="form-control flex flex-column">
            <label for="billerStreetAddress">Адрес</label>
            <input
              type="text"
              id="billerStreetAddress"
              v-model="billerStreetAddress"
            />
          </div>
        </div>
        <div class="form-row flex">
          <div class="form-control flex flex-column">
            <label for="billerCity">Город</label>
            <input type="text" id="billerCity" v-model="billerCity" />
          </div>
          <div class="form-control flex flex-column">
            <label for="billerZipCode">Почтовый Индекс</label>
            <input type="text" id="billerZipCode" v-model="billerZipCode" />
          </div>
          <div class="form-control flex flex-column">
            <label for="billerCountry">Страна</label>
            <input type="text" id="billerCountry" v-model="billerCountry" />
          </div>
        </div>
      </div>
      <!-- Bill To -->
      <div class="form-block">
        <h3 class="form-block-title">Кому</h3>
        <div class="form-row flex">
          <div class="form-control flex flex-column">
            <label for="clientName">Имя получателя</label>
            <input type="text" id="clientName" v-model="clientName" />
          </div>
        </div>
        <div class="form-row flex">
          <div class="form-control flex flex-column">
            <label for="clientEmail">Email получателя</label>
            <input type="text" id="clientEmail" v-model="clientEmail" />
          </div>
        </div>
        <div class="form-row flex">
          <div class="form-control flex flex-column">
            <label for="clientStreetAddress">Адрес получателя</label>
            <input
              type="text"
              id="clientStreetAddress"
              v-model="clientStreetAddress"
            />
          </div>
        </div>
        <div class="form-row flex">
          <div class="form-control flex flex-column">
            <label for="clientCity">Город получателя</label>
            <input type="text" id="clientCity" v-model="clientCity" />
          </div>
          <div class="form-control flex flex-column">
            <label for="clientZipCode">Почтовый Индекс получателя</label>
            <input type="text" id="clientZipCode" v-model="clientZipCode" />
          </div>
          <div class="form-control flex flex-column">
            <label for="clientCountry">Страна получателя</label>
            <input type="text" id="clientCountry" v-model="clientCountry" />
          </div>
        </div>
      </div>
      <!-- Invoice Details -->
      <div class="form-block">
        <h3 class="form-block-title">Детали счета</h3>
        <div class="form-row flex">
          <div class="form-control flex flex-column">
            <label for="invoiceDate">Дата счета</label>
            <input
              type="text"
              id="invoiceDate"
              v-model="invoiceDate"
              disabled
            />
          </div>
          <div class="form-control flex flex-column">
            <label for="paymentDueDate">Оплатить до</label>
            <input
              type="text"
              id="paymentDueDate"
              v-model="paymentDueDate"
              disabled
            />
          </div>
        </div>
        <div class="form-row flex">
          <div class="form-control flex flex-column">
            <label for="paymentTerms">Условия оплаты</label>
            <select id="paymentTerms">
              <option value="30">30 дней</option>
              <option value="60">60 дней</option>
            </select>
          </div>
        </div>
        <div class="form-row flex">
          <div class="form-control flex flex-column">
            <label for="productDescription">Описание услуги</label>
            <input
              type="text"
              id="productDescription"
              v-model="productDescription"
            />
          </div>
        </div>
      </div>
      <!-- Additionals -->
      <div class="form-block">
        <h3 class="form-block-title">Дополнительные услуги</h3>
        <table class="item-list flex flex-column">
          <tr class="table-heading flex">
            <th class="item-name">Название</th>
            <th class="qty">Количество</th>
            <th class="price">Цена</th>
            <th class="total">Итого</th>
          </tr>
          <tr
            class="table-items flex"
            v-for="(item, index) in invoiceItemList"
            :key="index"
          >
            <td class="item-name">
              <input type="text" v-model="item.itemName" />
            </td>
            <td class="qty">
              <input type="text" v-model="item.qty" />
            </td>
            <td class="price">
              <input type="text" v-model="item.price" />
            </td>
            <td class="total">
              {{ (item.total = item.qty * item.price) }} руб.
              <span @click="deleteInvoiceItem(item.id)">&#10008;</span>
            </td>
          </tr>
        </table>
        <div class="flex">
          <button @click="addNewInvoiceItem" class="add-btn dark-purple">
            <span>+</span> Добавить услугу
          </button>
        </div>
      </div>
      <!-- Save -->
      <div class="form-block">
        <div class="form-row save flex">
          <button class="red" @click="closeInvoice">Отменить</button>
          <div>
            <button class="dark-purple" @click="saveDraft">
              Сохранить Черновик
            </button>
            <button class="purple" @click="publishInvoice">
              Опубликовать счет
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      docId: null,
      loading: null,
      billerStreetAddress: null,
      billerCity: null,
      billerZipCode: null,
      billerCountry: null,
      clientName: null,
      clientEmail: null,
      clientStreetAddress: null,
      clientCity: null,
      clientZipCode: null,
      clientCountry: null,
      invoiceDateUnix: null,
      invoiceDate: null,
      paymentTerms: null,
      paymentDueDateUnix: null,
      paymentDueDate: null,
      productDescription: null,
      invoicePending: null,
      invoiceDraft: null,
      invoiceItemList: [],
      invoiceTotal: 0,
    };
  },

  methods: {
    ...mapMutations(["TOGGLE_INVOICE"]),
    closeInvoice() {
      this.TOGGLE_INVOICE();
    },
  },
};
</script>

<style lang="scss" scoped>
.invoice-wrap {
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 900px) {
    left: 90px;
    width: calc(100% - 90px);
  }
}
.invoice-form {
  max-width: 700px;
  width: 100%;
  background-color: #141625;
  color: #fff;
  padding: 56px;
  box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  h2 {
    margin-bottom: 24px;
  }
}

.form-block {
  margin-bottom: 48px;
}
.form-block-title {
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 800;
  color: #6b50d4;
}
.form-row {
  gap: 12px;
  margin-bottom: 16px;
  width: 100%;
}
.form-control {
  width: 100%;
}
label {
  font-size: 12px;
  margin-bottom: 6px;
}
input,
select {
  background-color: #1e2139;
  border-radius: 5px;
  outline: none;
  border: none;
  padding: 8px 12px;
  color: inherit;
  font: inherit;
  width: 100%;
  transition: 0.3s;

  &:focus {
    box-shadow: 0 2px 5px rgba(255, 255, 255, 0.2);
  }
}

.item-list {
  width: 100%;
  gap: 16px;
}
.table-heading,
.table-items {
  gap: 16px;

  th,
  td {
    text-align: left;

    display: flex;
    align-items: center;
  }

  .item-name {
    flex-basis: 40%;
  }
  .qty {
    flex-basis: 20%;
  }
  .price {
    flex-basis: 20%;
  }
  .total {
    flex-basis: 20%;

    span {
      display: inline-block;
      margin-left: auto;
      cursor: pointer;
    }
  }
}
button {
  font-size: 14px;
  font-weight: 700;
  transition: 0.3s;

  &:hover {
    box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.5);
  }
}
.add-btn {
  width: 100%;
  margin: 16px 0;
}

.save {
  margin-top: 60px;
  div {
    flex: 1;
    display: flex;
    justify-content: end;
  }
}
</style>
