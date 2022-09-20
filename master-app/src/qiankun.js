import { registerMicroApps, initGlobalState, addErrorHandler } from 'qiankun'
import store from './store'
import router from './router'

const actions = initGlobalState(store.getters.microAppState)

addErrorHandler((error) => {
  store.dispatch('microApp/changeError', true)
  console.error(error)
})

const sharedDispatcher = {
  reducer(action) {
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
  },

  dispatch(action) {
    this.reducer(action)
  }
}

const loader = (loading) => {
  store.dispatch('microApp/changeLoading', loading)
}

registerMicroApps([
  {
    name: 'react app',
    entry: '//localhost:3001',
    container: '#app-react',
    loader,
    activeRule: '/app-react/index',
    props: { shared: sharedDispatcher }
  },
  {
    name: 'vue app',
    entry: '//localhost:3002',
    container: '#app-vue',
    loader,
    activeRule: '/app-vue/index',
    props: { shared: sharedDispatcher }
  },
  {
    name: 'vue3 app',
    entry: '//localhost:3004',
    container: '#app-vue3',
    loader,
    activeRule: '/app-vue3/index',
    props: { shared: sharedDispatcher }
  },
  {
    name: 'purehtml app',
    entry: '//localhost:3003',
    container: '#app-purehtml',
    loader,
    activeRule: '/app-purehtml/index',
    props: { shared: sharedDispatcher }
  }
])

export default actions
