<template>
  <header class="flex">
    <nav>
      <div class="logo flex">$$</div>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
header {
  z-index: 99;
  background-color: #1e2139;
  @media (min-width: 900px) {
    min-height: 100%;
    min-width: 90px;
    flex-direction: column;
    border-radius: 0 20px 20px 0;
  }
}
.logo {
  width: 90px;
  height: 90px;
  background-color: #7c5dfa;
  color: #fff;
  border-radius: 0 20px 20px 0;
  align-items: center;
  justify-content: center;
  @media (min-width: 900px) {
    width: 100%;
  }
}
</style>
