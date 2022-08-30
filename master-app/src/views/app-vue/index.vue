<template>
  <div id="app-vue"></div>
</template>

<script>
import { start } from 'qiankun'

export default {
  mounted() {
    if (!window.qiankunStarted) {
      window.qiankunStarted = true
      start({ sandbox: {
        strictStyleIsolation: true, // 严格沙箱
        experimentalStyleIsolation: true // 实验性沙箱
      }})
    }
  }
}
</script>

<style>

</style>
