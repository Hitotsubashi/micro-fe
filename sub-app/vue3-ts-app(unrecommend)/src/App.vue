<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useMicroApp } from "@/hooks/useMicroApp";

export default defineComponent({
  name: "Vue3TSApp",
  setup() {
    if (window.__POWERED_BY_QIANKUN__) {
      useMicroApp();
    }
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
