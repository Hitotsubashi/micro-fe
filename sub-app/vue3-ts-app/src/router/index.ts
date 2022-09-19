import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
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
        path: "index",
        name: "page-main",
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

const history = createWebHistory(
  window.__POWERED_BY_QIANKUN__ ? "/app-vue3/index" : "/"
);

let router: Router = createRouter({
  history,
  routes,
});

export function destroyRouter() {
  // @ts-expect-error: Unreachable code error
  router = null;
  history.destroy();
}

export default router;
