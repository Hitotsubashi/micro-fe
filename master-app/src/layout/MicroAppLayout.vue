<template>
  <div :id="id" v-loading="loading" class="container" />
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

<style lang="scss" scoped>
  .container{
    min-height: 50vh;
  }
</style>
