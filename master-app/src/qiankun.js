import { registerMicroApps } from 'qiankun'

registerMicroApps([
  {
    name: 'react app', // app name registered
    entry: '//localhost:3000',
    container: '#app-react',
    activeRule: '/app-react/index'
  },
  {
    name: 'vue app', // app name registered
    entry: '//localhost:8081',
    container: '#app-vue',
    activeRule: '/app-vue/index'
  }
])

// start({ sandbox: {
//   strictStyleIsolation: true, // 严格沙箱
//   experimentalStyleIsolation: true // 实验性沙箱
// }})
