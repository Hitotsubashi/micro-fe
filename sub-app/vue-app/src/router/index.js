import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "/",
    component: () => import("@/views/index.vue"),
    children: [
      {
        path: "/page-a",
        name: "page-a",
        component: () => import("@/views/PageA/index"),
        meta: { title: "PageA" },
        redirect: { name: "page-a-2" },
        children: [
          {
            path: "a-1",
            name: "page-a-1",
            component: () => import("@/views/PageA/A1"),
            meta: { title: "A1" },
          },
          {
            path: "a-2",
            name: "page-a-2",
            component: () => import("@/views/PageA/A2"),
            meta: { title: "A2" },
          },
        ],
      },
      {
        path: "/page-b",
        name: "page-b",
        component: () => import("@/views/PageB/index"),
        meta: { title: "PageB" },
      },
      {
        path: "/",
        name: "page-main",
        component: () => import("@/views/PageMain/index"),
      },
    ],
  },
  {
    path: "*",
    name: "404",
    component: () => import("@/views/404"),
  },
  // { path: "*", redirect: "/404", hidden: true },
];

let router

export default function getRouter(base){
  if(!router){
    router = new Router({
      mode: "history", // require service support
      scrollBehavior: () => ({ y: 0 }),
      base: window.__POWERED_BY_QIANKUN__ ? "/app-vue/index" : "/",
      routes,
    });
  }
  return router
}

