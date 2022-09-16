<template>
  <div class="container">404</div>
</template>

<script>
export default {
  name: "404-page",
  beforeCreate() {
    if (window.__POWERED_BY_QIANKUN__) {
      this.$shared.dispatch({
        type: "CHANGE_ROUTE",
        payload: "/404",
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
  margin-top: 20vh;
  font-size: 18px;
}
</style>
