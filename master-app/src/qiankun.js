import { registerMicroApps } from 'qiankun'

registerMicroApps([
  {
    name: 'react app', // app name registered
    entry: '//localhost:3000',
    container: '#micro-container',
    activeRule: '/micro-app/app-react'
  },
  {
    name: 'vue app', // app name registered
    entry: '//localhost:8081',
    container: '#micro-container',
    activeRule: '/micro-app/app-vue'
  }
])

// start({ sandbox: {
//   strictStyleIsolation: true, // 严格沙箱
//   experimentalStyleIsolation: true // 实验性沙箱
// }})
