import { registerMicroApps, start } from 'qiankun'

registerMicroApps([
  {
    name: 'react app', // app name registered
    entry: '//localhost:3001',
    container: '#micro-container',
    activeRule: '/app-react/index'
  },
])

start()
