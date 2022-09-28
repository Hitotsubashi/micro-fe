<template>
  <div>
    PageA
    <div class="change-route-buttons">
      <router-link class="button" :to="{ name: 'page-a-1' }">A1</router-link>
      <router-link class="button" :to="{ name: 'page-a-2' }">A2</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";

export default defineComponent({
  name: "PageA",
});
</script>

<style lang="scss" scoped>
.change-route-buttons {
  text-align: center;

  .button {
    margin: 12px;
  }
}
</style>
