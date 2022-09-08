import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    {
        path: '/page-a',
        name:'page-a',
        component: () => import('@/views/PageA/index'),
        meta: {title:'PageA'},
        children:[
            {
                path: 'a-1',
                name: 'page-a-1',
                component: () => import('@/views/PageA/A1'),
                meta: {title:'A1'},
            },
            {
                path: 'a-2',
                name: 'page-a-2',
                component: () => import('@/views/PageA/A2'),
                meta: {title:'A2'},
            }
        ]
    },
    {
        path: '/page-b',
        name:'page-b',
        component: () => import('@/views/PageB/index'),
        meta: {title:'PageB'}
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