import { registerMicroApps, initGlobalState, addErrorHandler } from 'qiankun'
import store from './store'
import router from './router'
import { createStore } from 'redux'

const actions = initGlobalState(store.getters.microAppState)

addErrorHandler(() => {
  store.dispatch('microApp/changeError', true)
})

function reducer(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_GLOBAL_STATE':
      actions.setGlobalState(action.payload)
      return state
    case 'CHANGE_ROUTE':
      router.push(action.payload)
      return state
    default:
      break
  }
}

const shared = createStore(reducer, {})

const loader = (loading) => {
  store.dispatch('microApp/changeLoading', loading)
}

registerMicroApps([
  {
    name: 'react app', // app name registered
    entry: '//localhost:3001',
    container: '#app-react',
    loader,
    activeRule: '/app-react/index',
    props: { shared }
  },
  {
    name: 'vue app', // app name registered
    entry: '//localhost:3002',
    container: '#app-vue',
    loader,
    // activeRule: '/app-vue/index',
    activeRule: (location)=>location.pathname.startsWith('/app-vue/index'),
    props: { shared }
  },
  {
    name: 'purehtml app', // app name registered
    entry: '//localhost:3003',
    container: '#app-purehtml',
    loader,
    activeRule: '/app-purehtml/index',
    props: { shared }
  }
])

export default actions
