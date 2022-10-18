import Layout from '@/layout'
import MicroAppLayout from '@/layout/MicroAppLayout'
import Vue from 'vue'

const microAppRoutes = [
  {
    path: '/app-react',
    component: Layout,
    children: [
      {
        path: 'index*',
        name: 'AppReact',
        component: Vue.extend({ ...MicroAppLayout, name: 'AppReact' }),
        props: { id: 'app-react' },
        meta: {
          title: 'ReactTSApp',
          microApp: {
            name: 'react app',
            entry: '//localhost:3001',
            container: '#app-react',

            activeRule: '/app-react/index',
            props: { basepath: '/app-react/index' }
          },
          noCache: true,
          menuPath: 'index',
          icon: 'el-icon-coin'
        }
      }
    ]
  },
  {
    path: '/app-vue',
    component: Layout,
    children: [
      {
        path: 'index*',
        name: 'AppVue',
        component: Vue.extend({ ...MicroAppLayout, name: 'AppVue' }),
        props: { id: 'app-vue' },
        meta: {
          title: 'VueApp',
          microApp: {
            name: 'vue app',
            entry: '//localhost:3002',
            container: '#app-vue',

            activeRule: '/app-vue/index',
            props: { basepath: '/app-vue/index' }
          },
          noCache: true,
          menuPath: 'index',
          icon: 'el-icon-coin'
        }
      }
    ]
  },
  {
    path: '/app-vue3',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'AppVue3',
        component: Vue.extend({ ...MicroAppLayout, name: 'AppVue3' }),
        props: { id: 'app-vue3' },
        meta: {
          title: 'Vue3App',
          microApp: {
            name: 'vue3 app',
            entry: '//localhost:3004',
            container: '#app-vue3',
            activeRule: '/app-vue3/index',
            props: { basepath: '/app-vue3/index' }
          },
          // noCache: true,
          icon: 'el-icon-coin'
        }
      }
    ]
  },
  {
    path: '/app-purehtml',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'AppPurehtml',
        component: Vue.extend({ ...MicroAppLayout, name: 'AppPurehtml' }),
        props: { id: 'app-purehtml' },
        meta: {
          title: 'PureHTMLApp',
          microApp: {
            name: 'purehtml app',
            entry: '//localhost:3003',
            container: '#app-purehtml',
            activeRule: '/app-purehtml/index'
          },
          icon: 'el-icon-coin'
        }
      }
    ]
  }
]

export default microAppRoutes
