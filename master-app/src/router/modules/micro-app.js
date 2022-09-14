import Layout from '@/layout'
import MicroAppLayout from '@/layout/MicroAppLayout'

const microAppRoutes = [
  {
    path: '/app-react',
    component: Layout,
    children: [
      {
        path: 'index*',
        name: 'app-react',
        component: MicroAppLayout,
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
        component: MicroAppLayout,
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
        component: MicroAppLayout,
        props: { id: 'app-purehtml' },
        meta: { title: 'PureHTMLApp', microApp: true, noCache: true, icon: 'el-icon-coin' }
      }
    ]
  }
]

export default microAppRoutes
