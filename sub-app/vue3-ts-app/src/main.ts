import "./public-path";
import { createApp } from "vue";
import App from "./App.vue";
// import { getRouter, destroyRouter } from "./router";
import pinia from "./pinia";
import { useAppStore } from "./pinia/modules/app";

let instance: ReturnType<typeof createApp> | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function render(props: any) {
  const { container, shared } = props;
  instance = createApp(App).use(pinia);
  // .use(getRouter(basepath));
  if (window.__POWERED_BY_QIANKUN__) {
    instance.provide("$shared", shared);
  }
  instance.mount(container ? container.querySelector("#app") : "#app");
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
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
  // destroyRouter();
}
