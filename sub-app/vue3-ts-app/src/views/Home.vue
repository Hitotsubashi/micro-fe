<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue3 + TypeScript App" />
    <ThemeColor />
    <ChangeMicroAppButton />
    <input v-model="value" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import ThemeColor from "@/components/ThemeColor.vue";
import ChangeMicroAppButton from "@/components/ChangeMicroAppButton.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    HelloWorld,
    ThemeColor,
    ChangeMicroAppButton,
  },
  setup() {
    const value = ref("");

    return { value };
  },
});
</script>
