<template>
  <div>
    <div v-if="!error" :id="id" v-loading="loading" class="container" />
    <el-result v-else icon="error" title="微应用加载失败" />
  </div>
</template>

<script>
import { loadMicroApp } from 'qiankun'
import { mapState } from 'vuex'

export default {
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      microApp: undefined
    }
  },
  computed: {
    ...mapState({
      loading: state => state.microApp.loading,
      error: state => state.microApp.error
    })
  },
  mounted() {
    this.$store.dispatch('microApp/changeLoading', true)
    this.microApp = loadMicroApp(
      this.$route.meta.microApp,
      {
        sandbox: {
          // strictStyleIsolation: true, // 严格沙箱
          experimentalStyleIsolation: true // 实验性沙箱
        }
      }
    )
    this.microApp.mountPromise
      .then(()=>{
        this.$store.dispatch('microApp/changeLoading', false)
      })
      .catch(()=>{
        this.$store.dispatch('microApp/changeError', true)
      })
  },
  beforeDestroy() {
    this.microApp?.unmount()
  }
}
</script>

<style lang="scss" scoped>
  .container{
    min-height: 50vh;
  }
</style>
