import { registerMicroApps, start } from 'qiankun'
import store from './store'

const isProd = process.env.NODE_ENV === "production"

const loader = (loading) => {
  store.dispatch('microApp/changeLoading', loading)
}

registerMicroApps([
  {
    name: 'react app',
    entry: isProd?`//${location.host}/react-app/`:'//localhost:3001',
    container: '#app-react',
    loader,
    activeRule: '/app-react/index',
    props: {
      basepath: '/app-react/index'
    }
  },
  {
    name: 'vue app',
    entry: isProd?`//${location.host}/vue-app/`:'//localhost:3002',
    container: '#app-vue',
    loader,
    activeRule: '/app-vue/index',
    props: {
      basepath: '/app-vue/index'
    }
  },
  {
    name: 'vue3 app',
    entry: isProd?`//${location.host}/vue3-app/`:'//localhost:3004',
    container: '#app-vue3',
    loader,
    activeRule: '/app-vue3/index',
    props: {
      basepath: '/app-vue3/index'
    }
  },
  {
    name: 'purehtml app',
    entry: '//localhost:3003',
    container: '#app-purehtml',
    loader,
    activeRule: '/app-purehtml/index'
  }
])

start()
