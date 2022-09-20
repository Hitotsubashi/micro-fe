<template>
  <div class="row">
    <button @click="changeRoute">跳到react app 微应用</button>
  </div>
</template>

<script lang="ts" setup>
import { inject } from "vue";

const $shared = inject("$shared") as any;

function changeRoute() {
  $shared.dispatch({
    type: "CHANGE_ROUTE",
    payload: "/app-react/index",
  });
}
</script>

<style lang="scss" scoped>
.row {
  margin: 8px;
  text-align: center;
}
</style>
