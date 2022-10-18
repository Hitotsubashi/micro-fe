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
        meta: { title: 'ReactTSApp', microApp: true, noCache: true, menuPath: 'index', icon: 'el-icon-coin' }
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
        meta: { title: 'VueApp', microApp: true, noCache: true, menuPath: 'index', icon: 'el-icon-coin' }
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
        meta: { title: 'Vue3App', microApp: true, noCache: true, icon: 'el-icon-coin' }
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
        meta: { title: 'PureHTMLApp', microApp: true, noCache: true, icon: 'el-icon-coin' }
      }
    ]
  }
]

export default microAppRoutes
