import "./public-path";
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import getRouter from "./router";
import devtoolEnhanceMixin from "@/mixin/micro-app/devtool-enhance-mixin";
import uploadRoutesMixin from "@/mixin/micro-app/upload-routes-mixin";
const { name, version } = require("../package.json");
// import { initSentry } from "./sentry";

Vue.config.productionTip = false;

let instance;

function render(props = {}) {
  const { container, basepath } = props;

  const router = getRouter(basepath);

  instance = new Vue({
    name: "VueApp",
    router: router,
    store,
    render: (h) => h(App),
    mixins: container ? [devtoolEnhanceMixin, uploadRoutesMixin] : undefined,
  }).$mount(container ? container.querySelector("#app") : "#app");
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  window.dispatchEvent(
    new CustomEvent("micro-app-dispatch", {
      detail: {
        type: "SET_MICRO_APP_RELEASE",
        payload: {
          app_name: "vue-app",
          version: `${name}@${version}`,
        },
      },
    })
  );
  console.log("[vue] vue app bootstraped");
}

export async function mount(props) {
  console.log("[vue] vue app mount", props);
  let sentry;
  // let vueAppInit;
  // let vueAppInit1;
  let attachErrorHandler;
  props.onGlobalStateChange((state) => {
    ({ sentry } = state);
    // ({ vueAppInit } = state);
    // ({ vueAppInit1 } = state);
    ({ attachErrorHandler } = state);
    store.dispatch("app/changeTheme", state.theme);
  }, true);
  // vueAppInit({
  //   Vue,
  //   tracesSampleRate: 1.0,
  //   logErrors: true,
  //   attachProps: true,
  // });

  // vueAppInit1(Vue, {
  //   tracesSampleRate: 1.0,
  //   logErrors: true,
  //   attachProps: true,
  // });

  // sentry.init({
  //   Vue,
  //   tracesSampleRate: 1.0,
  //   logErrors: true,
  //   attachProps: true,
  // });

  // Vue.config.errorHandler = (err) => {
  //   console.log("Vue.config.errorHandler", err);
  //   sentry.captureException(err, (scope) => {
  //     scope.setExtra("release", `${name}@${version}`);
  //   });
  // };

  attachErrorHandler(Vue, { logErrors: true, attachProps: true });
  render(props);
}

export async function unmount() {
  console.log("[vue] vue app unmount");
  instance.$destroy();
  // 防止存在内存泄漏，可看https://github.com/umijs/qiankun/issues/674
  instance.$el.innerHTML = "";
  instance = null;
}
