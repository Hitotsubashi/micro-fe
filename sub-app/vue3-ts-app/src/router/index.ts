import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
  RouterHistory,
} from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
    children: [
      {
        path: "page-a",
        name: "page-a",
        component: () => import("@/views/PageA/index.vue"),
        meta: { title: "PageA" },
        children: [
          {
            path: "a-1",
            name: "page-a-1",
            component: () => import("@/views/PageA/A1.vue"),
            meta: { title: "A1" },
          },
          {
            path: "a-2",
            name: "page-a-2",
            component: () => import("@/views/PageA/A2.vue"),
            meta: { title: "A2" },
          },
        ],
      },
      {
        path: "page-b",
        name: "page-b",
        component: () => import("@/views/PageB/index.vue"),
        meta: { title: "PageB" },
      },
      {
        path: "/",
        name: "home",
        component: () => import("@/views/PageMain/index.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/views/404.vue"),
  },
];

let history: RouterHistory;
let router: Router;

export function getRouter(base: string) {
  if (!router) {
    history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? base : "/");
    router = createRouter({
      history,
      routes,
    });
  }
  return router;
}

export function destroyRouter() {
  // @ts-expect-error: Unreachable code error
  router = null;
  history.destroy();
}
