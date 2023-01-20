<template>
  <div id="app">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <ThemeColor />
    <ChangeMicroAppButton />
    <ChangeRoute />
    <button @click="throwError">Error</button>
    <button @click="throwPromiseError">PromiseError</button>
    <button @click="throwSetTimeoutError">SetTimeoutError</button>
  </div>
</template>

<script>
import ThemeColor from "@/components/ThemeColor";
import ChangeMicroAppButton from "@/components/ChangeMicroAppButton";
import ChangeRoute from "@/components/ChangeRoute";

export default {
  name: "App",
  components: {
    ThemeColor,
    ChangeMicroAppButton,
    ChangeRoute,
  },
  methods: {
    throwError() {
      throw new Error("vue-app error1");
    },
    throwPromiseError() {
      return Promise.reject("vue-app promise error1");
    },
    throwSetTimeoutError() {
      setTimeout(() => {
        throw new Error("vue-app settimeout error1");
      });
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
