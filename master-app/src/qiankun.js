import { registerMicroApps } from 'qiankun'
import store from './store'

const loader = (loading) => {
  store.dispatch('microApp/changeLoading', loading)
}

registerMicroApps([
  {
    name: 'react app', // app name registered
    entry: '//localhost:3001',
    container: '#app-react',
    loader,
    activeRule: '/app-react/index'
  },
  {
    name: 'vue app', // app name registered
    entry: '//localhost:3002',
    container: '#app-vue',
    loader,
    activeRule: '/app-vue/index'
  },
  {
    name: 'purehtml app', // app name registered
    entry: '//localhost:3003',
    container: '#app-purehtml',
    loader,
    activeRule: '/app-purehtml/index'
  }
])

// start({ sandbox: {
//   strictStyleIsolation: true, // 严格沙箱
//   experimentalStyleIsolation: true // 实验性沙箱
// }})
