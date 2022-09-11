import { mapGetters } from 'vuex'
import { addErrorHandler, initGlobalState } from 'qiankun'
import store from '@/store'

const actions = initGlobalState(store.getters.microAppState)

addErrorHandler((error) => {
  store.dispatch('microApp/changeError', true)
  console.error(error)
})

export default {
  computed: {
    ...mapGetters(['microAppState'])
  },
  watch: {
    'microAppState': {
      handler(val) {
        actions.setGlobalState({
          ...val
        })
      },
      deep: true
    }
  }
}
