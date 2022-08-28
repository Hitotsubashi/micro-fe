import { registerMicroApps, start } from 'qiankun'

registerMicroApps([
  {
    name: 'react app', // app name registered
    // entry: '//localhost:3000',
    entry: { scripts: ['//localhost:3000/static/js/bundle.js'] },
    container: '#micro-container',
    activeRule: '/app-react/index'
  },
])

start()
