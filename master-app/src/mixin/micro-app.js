import { start } from 'qiankun'
import { mapState } from 'vuex'

const mixin = {
  mounted() {
    if (!window.qiankunStarted) {
      window.qiankunStarted = true
      start(

        { sandbox: {
          // strictStyleIsolation: true // 严格沙箱
          experimentalStyleIsolation: true // 实验性沙箱
        }}
      )
    }
  },
  computed: {
    ...mapState({
      loading: state => state.microApp.loading
    })
  }
}

export default mixin
