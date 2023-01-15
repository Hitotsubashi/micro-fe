import { mapGetters } from 'vuex'
import { initGlobalState } from 'qiankun'
import store from '@/store'
import router from '@/router'
import { logout } from '@/utils/auth'

const actions = initGlobalState(store.getters.microAppState)

const handleMicroAppDispatchEvent = (e) => {
  const { detail: action } = e
  switch (action.type) {
    case 'SET_MICRO_APP_RELEASE':
      // eslint-disable-next-line no-case-declarations
      const { app_name, version } = action.payload
      window[`$${app_name}`] = version
      break
    case 'CHANGE_ROUTE':
      router.push(action.payload)
      break
    case 'UPDATE_ROUTES':
      store.dispatch('microApp/updateRoutes', action.payload)
      break
    case 'LOGOUT':
      logout(action.payload)
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
