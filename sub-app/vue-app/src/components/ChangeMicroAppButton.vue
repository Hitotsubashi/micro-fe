<template>
  <div class="row">
    <button @click="changeRoute">跳到react app 微应用</button>
  </div>
</template>

<script>
export default {
  methods: {
    changeRoute() {
      this.$shared.dispatch({
        type: "CHANGE_ROUTE",
        payload: "/app-react/index",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.row {
  margin: 8px;
  text-align: center;
}
</style>
