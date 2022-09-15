import Layout from '@/layout'
import MicroAppLayout from '@/layout/MicroAppLayout'
import Vue from 'vue'

console.log('MicroAppLayout', MicroAppLayout);

const microAppRoutes = [
  {
    path: '/app-react',
    component: Layout,
    children: [
      {
        path: 'index*',
        name: 'app-react',
        component: Vue.extend({...MicroAppLayout,name: 'app-react'}),
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
        name: 'app-vue',
        component: Vue.extend({...MicroAppLayout,name: 'app-vue'}),
        props: { id: 'app-vue' },
        meta: { title: 'VueApp', microApp: true, noCache: true, menuPath: 'index', icon: 'el-icon-coin' }
      }
    ]
  },
  {
    path: '/app-purehtml',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'app-purehtml',
        component: Vue.extend({...MicroAppLayout,name: 'app-purehtml'}),
        props: { id: 'app-purehtml' },
        meta: { title: 'PureHTMLApp', microApp: true, noCache: true, icon: 'el-icon-coin' }
      }
    ]
  }
]

export default microAppRoutes
