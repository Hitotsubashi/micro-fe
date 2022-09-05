<template>
  <div :id="id" />
</template>

<script>
import { start } from 'qiankun'
import { mapState } from 'vuex'

export default {
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    ...mapState({
      loading: state => state.microApp.loading
    })
  },
  mounted() {
    if (!window.qiankunStarted) {
      window.qiankunStarted = true
      start({ sandbox: {
        // strictStyleIsolation: true, // 严格沙箱
        experimentalStyleIsolation: true // 实验性沙箱
      }})
    }
  }
}
</script>

<style>

</style>
