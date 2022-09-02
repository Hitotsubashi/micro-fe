import { registerMicroApps, initGlobalState } from 'qiankun'
import store from './store'
import { createStore } from 'redux'

function reducer(state, action) {
  switch (action.type) {
    case '':
      break
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
    activeRule: '/app-vue/index',
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

const actions = initGlobalState(store.getters.microAppState)
export default actions
