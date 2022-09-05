import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    {
        path: '/pageA',
        name:'page-a',
        component: () => import('@/views/PageA/index'),
    },
    {
        path: '/pageB',
        name:'page-b',
        component: () => import('@/views/PageB/index'),
    },
    {
        path: '/',
        name: 'page-main',
        component: () => import('@/views/PageMain/index'),
    }
]

const router =  new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    base: window.__POWERED_BY_QIANKUN__ ? '/app-vue/index' : '/',
    routes
})

export default router