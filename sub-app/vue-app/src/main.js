import "./public-path";
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import getRouter from "./router";
import devtoolEnhanceMixin from "@/mixin/micro-app/devtool-enhance-mixin";
import uploadRoutesMixin from "@/mixin/micro-app/upload-routes-mixin";

Vue.config.productionTip = false;

let instance;

function render(props = {}) {
  const { container, basepath } = props;

  const router = getRouter(basepath);

  window.dispatchEvent(
    new CustomEvent("micro-app-dispatch", {
      detail: {
        type: "SET_MICRO_APP_HUB",
        payload: {
          type: "vue",
          settings: {
            Vue,
            router,
            options: {
              dsn: "http://efe551031a524c3db8b9a147b9754a22@139.9.68.82:9000/4",
              release: process.env.VUE_APP_RELEASE,
              beforeSend(event) {
                event.exception.values = event.exception.values.map((item) => {
                  const {
                    stacktrace: { frames },
                    ...rest
                  } = item;
                  // FIXME: 主应用加载时，qiankun 加载当前js资源会在首行添加 window.__TEMP_EVAL_FUNC__ = function(){;(function(window, self, globalThis){with(window){;
                  // https://github.com/kuitos/import-html-entry/blob/master/src/index.js#L62
                  frames[frames.length - 1].colno -=
                    "window.__TEMP_EVAL_FUNC__ = function(){;(function(window, self, globalThis){with(window){;".length;
                  return {
                    ...rest,
                    stacktrace: {
                      frames,
                    },
                  };
                });
                return event;
              },
            },
          },
        },
      },
    })
  );

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
  // window.dispatchEvent(
  //   new CustomEvent("micro-app-dispatch", {
  //     detail: {
  //       type: "SET_MICRO_APP_RELEASE",
  //       payload: {
  //         app_name: "vue-app",
  //         version: process.env.VUE_APP_RELEASE,
  //       },
  //     },
  //   })
  // );

  console.log("[vue] vue app bootstraped");
}

export async function mount(props) {
  console.log("[vue] vue app mount", props);
  props.onGlobalStateChange((state) => {
    store.dispatch("app/changeTheme", state.theme);
  }, true);
  // props.sentryInit?.(Vue, {
  //   tracesSampleRate: 1.0,
  //   logErrors: true,
  //   attachProps: true,
  // });
  render(props);
}

export async function unmount() {
  console.log("[vue] vue app unmount");
  instance.$destroy();
  // 防止存在内存泄漏，可看https://github.com/umijs/qiankun/issues/674
  instance.$el.innerHTML = "";
  instance = null;
}
