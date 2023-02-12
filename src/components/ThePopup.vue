<template>
  <div class="popup-wrapper">
    <div class="popup-content">
      <p class="popup-text">
        Вы уверены, что хотите закрыть форму заполнения счета?
      </p>
      <div class="popup-control flex">
        <button @click="closePopup" class="purple">
          Вернуться к заполнению
        </button>
        <button @click="closeInvoice" class="red">Закрыть форму</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["TOGGLE_POPUP", "TOGGLE_INVOICE"]),
    closeInvoice() {
      this.TOGGLE_POPUP();
      this.TOGGLE_INVOICE();
    },
    closePopup() {
      this.TOGGLE_POPUP();
    },
  },
};
</script>

<style lang="scss" scoped>
.popup-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);

  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  .popup-content {
    width: 500px;
    background-color: #1e2139;
    border-radius: 10px;
    padding: 32px;
    text-align: center;
  }

  .popup-text {
    font-size: 24px;
    margin-bottom: 36px;
  }

  .popup-control {
    justify-content: space-between;
  }

  button {
    font-size: 16px;
  }
}
</style>
