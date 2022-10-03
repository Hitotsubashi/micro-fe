import { mapGetters } from 'vuex'
import { addErrorHandler, initGlobalState } from 'qiankun'
import store from '@/store'
import router from '@/router'

const actions = initGlobalState(store.getters.microAppState)

addErrorHandler((error) => {
  store.dispatch('microApp/changeError', true)
  console.error(error)
})

const handleMicroAppDispatchEvent = (e) => {
  const { detail: action } = e
  switch (action.type) {
    case 'CHANGE_ROUTE':
      router.push(action.payload)
      break
    case 'UPDATE_ROUTES':
      store.dispatch('microApp/updateRoutes', action.payload)
      break
    default:
      break
  }
}

export default {
  computed: {
    ...mapGetters(['microAppState'])
  },
  created() {
    this.listenMicroAppDispatchEvent()
  },
  methods: {
    listenMicroAppDispatchEvent() {
      window.addEventListener('micro-app-dispatch', handleMicroAppDispatchEvent)
      this.$once('beforeDestroy', () => {
        window.removeEventListener(handleMicroAppDispatchEvent)
      })
    }
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
