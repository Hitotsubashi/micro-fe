<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue3 + TypeScript App" />
    <ThemeColor />
    <ChangeMicroAppButton />
    <ChangeRoute />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import ThemeColor from "@/components/ThemeColor.vue";
import ChangeMicroAppButton from "@/components/ChangeMicroAppButton.vue";
import ChangeRoute from "@/components/ChangeRoute.vue";

@Options({
  components: {
    HelloWorld,
    ThemeColor,
    ChangeMicroAppButton,
    ChangeRoute,
  },
})
export default class HomeView extends Vue {}
</script>
