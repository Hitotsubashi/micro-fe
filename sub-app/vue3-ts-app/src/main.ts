import "./public-path";
import { createApp } from "vue";
import App from "./App.vue";
import pinia from "./pinia";
import { useAppStore } from "./pinia/modules/app";

let instance: ReturnType<typeof createApp> | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function render(props: any) {
  // const { container, sentryInit } = props;
  const { container } = props;
  instance = createApp(App).use(pinia);
  // console.log("sentryInit", sentryInit);
  // sentryInit?.(instance, {
  //   tracesSampleRate: 1.0,
  //   logErrors: true,
  //   attachProps: true,
  // });
  window.dispatchEvent(
    new CustomEvent("micro-app-dispatch", {
      detail: {
        type: "SET_MICRO_APP_HUB",
        payload: {
          type: "vue",
          settings: {
            Vue: instance,
            options: {
              dsn: "http://69db23f1da3d4ad48359b5a61bb5bb3f@139.9.68.82:9000/5",
              release: process.env.VUE_APP_RELEASE,
              beforeSend(event: any) {
                event.exception.values = event.exception.values.map(
                  (item: any) => {
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
                  }
                );
                return event;
              },
            },
          },
        },
      },
    })
  );
  instance.mount(container ? container.querySelector("#app") : "#app");
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  window.dispatchEvent(
    new CustomEvent("micro-app-dispatch", {
      detail: {
        type: "SET_MICRO_APP_RELEASE",
        payload: {
          app_name: "vue3-ts-app",
          version: process.env.VUE_APP_RELEASE,
        },
      },
    })
  );
  console.log("vue3 app bootstraped");
}

export async function mount(props: any) {
  console.log("vue] vue3 app mount", props);
  props.onGlobalStateChange((state: any) => {
    const app = useAppStore();
    app.changeTheme(state.theme);
  });
  render(props);
}

export async function unmount() {
  console.log("[vue] vue3 app unmount");
  instance!.unmount();
  instance!._container!.innerHTML = "";
}
