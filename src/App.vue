<template>
  <div v-if="invoicesLoaded">
    <div class="app flex" v-if="!isMobile">
      <the-navigation />
      <div class="app-content">
        <the-popup v-if="popup" />
        <transition name="invoice">
          <invoice-modal v-if="invoiceModal" />
        </transition>
        <router-view />
      </div>
    </div>
    <div v-else class="mobile-message flex flex-column">
      <h2>Это приложение не поддерживается на мобильных устройствах</h2>
      <p>Чтобы пользоваться приложением, зайдите через планшет или компьютер</p>
    </div>
  </div>
</template>

<script>
import TheNavigation from "./components/TheNavigation.vue";
import InvoiceModal from "./components/InvoiceModal.vue";
import ThePopup from "./components/ThePopup.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: { TheNavigation, InvoiceModal, ThePopup },
  data() {
    return {
      isMobile: null,
    };
  },
  methods: {
    ...mapActions(["GET_INVOICES"]),
    checkMobile() {
      const windowWidth = window.innerWidth;
      if (windowWidth < 750) {
        this.isMobile = true;
        return;
      }
      this.isMobile = false;
    },
  },
  created() {
    this.GET_INVOICES();
    this.checkMobile();
    window.addEventListener("resize", this.checkMobile);
  },
  computed: {
    ...mapState(["invoiceModal", "popup", "invoicesLoaded"]),
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
body {
  color: #fff;
}
.app {
  background-color: #141625;
  min-height: 100vh;
  flex-direction: column;

  @media (min-width: 900px) {
    flex-direction: row;
  }

  .app-content {
    padding: 0 20px;
    flex: 1;
    position: relative;
  }
}

.mobile-message {
  background-color: #141625;
  color: #fff;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  h2 {
    margin-bottom: 16px;
  }
}
button,
.button {
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 30px;
  border: none;
  font-size: 14px;
  margin-right: 8px;
  color: #fff;
}
.dark-purple {
  background-color: #252945;
}
.red {
  background-color: #ec5757;
}
.purple {
  background-color: #7c5dfa;
}
.green {
  background-color: #33d69f;
}
.orange {
  background-color: #ff8f00;
}
// utility classes
.flex {
  display: flex;
}
.flex-column {
  flex-direction: column;
}
.container {
  width: 100%;
  padding: 40px 10px;
  max-width: 850px;
  margin: 0 auto;
  @media (min-width: 900px) {
    padding-top: 72px;
  }
}
.nav-link {
  text-decoration: none;
  color: initial;
}
// Status Button Styling
.status-button {
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
  }
  font-size: 14px;
  margin-right: 30px;
  align-items: center;
  padding: 8px 30px;
  border-radius: 10px;
}
.paid {
  &::before {
    background-color: #33d69f;
  }
  color: #33d69f;
  background-color: rgba(51, 214, 160, 0.1);
}
.pending {
  &::before {
    background-color: #ff8f00;
  }
  color: #ff8f00;
  background-color: rgba(255, 145, 0, 0.1);
}
.draft {
  &::before {
    background-color: #dfe3fa;
  }
  color: #dfe3fa;
  background-color: rgba(223, 227, 250, 0.1);
}

//animate invoice form
.invoice-enter-active,
.invoice-leave-active {
  transition: 0.8s;
}

.invoice-enter-from,
.invoice-leave-to {
  transform: translateX(-900px);
}
</style>
