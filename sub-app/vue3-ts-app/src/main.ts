import "./public-path";
import { createApp } from "vue";
import App from "./App.vue";
import pinia from "./pinia";
import { useAppStore } from "./pinia/modules/app";
import { name, version } from "../package.json";

let instance: ReturnType<typeof createApp> | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function render(props: any) {
  const { container } = props;
  instance = createApp(App).use(pinia);
  // initSentry(instance);
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
          version: `${name}@${version}`,
        },
      },
    })
  );
  console.log("vue3 app bootstraped");
}

export async function mount(props: any) {
  console.log("vue] vue3 app mount", props);
  render(props);
  props.onGlobalStateChange((state: any) => {
    const app = useAppStore();
    app.changeTheme(state.theme);
  });
}

export async function unmount() {
  console.log("[vue] vue3 app unmount");
  instance!.unmount();
  instance!._container!.innerHTML = "";
}
