<template>
  <div>
    <div v-if="!error" :id="id" />
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
        fetch: async(url, ...args) => {
          this.$store.dispatch('microApp/changeLoading', true)
          this.$store.dispatch('microApp/changeError', false)
          try {
            const res = await window.fetch(url, {
              ...args,
              mode: 'cors',
              cache: 'no-store'
            })
            return res
          } catch (error) {
            console.log('error', error)
            this.$store.dispatch('microApp/changeError', true)
          } finally {
            this.$store.dispatch('microApp/changeLoading', false)
          }
        },
        sandbox: {
          // strictStyleIsolation: true, // 严格沙箱
          experimentalStyleIsolation: true // 实验性沙箱
        }
      })
    }
  }
}
</script>

<style>

</style>
