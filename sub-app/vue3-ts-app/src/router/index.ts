import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const history = createWebHistory(
  // @ts-expect-error: Unreachable code error
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
