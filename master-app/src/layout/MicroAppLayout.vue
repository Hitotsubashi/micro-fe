<template>
  <div>
    <div v-if="!error" :id="id" v-loading="loading" :class="{'loading-container':loading}" />
    <el-result v-else icon="error" title="微应用加载失败" />
  </div>
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
      loading: state => state.microApp.loading,
      error: state => state.microApp.error
    })
  },
  mounted() {
    if (!window.qiankunStarted) {
      window.qiankunStarted = true
      start({
        sandbox: {
          // strictStyleIsolation: true, // 严格沙箱
          experimentalStyleIsolation: true // 实验性沙箱
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .loading-container{
    height: 80vh;
  }
</style>
