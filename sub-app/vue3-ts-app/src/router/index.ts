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
