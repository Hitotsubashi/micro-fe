import { createApp } from "vue";
import App from "./App.vue";
import router, { destroyRouter } from "./router";
import store from "./store";

let instance: ReturnType<typeof createApp> | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function render(props: any) {
  const { container } = props;
  instance = createApp(App).use(store).use(router);
  instance.mount(container ? container.querySelector("#app") : "#app");
}

// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log("%c%s", "color: green;", "vue3.0 app bootstraped");
}

export async function mount(props: any) {
  render(props);
  // instance.config.globalProperties.$onGlobalStateChange = props.onGlobalStateChange;
  // instance.config.globalProperties.$setGlobalState = props.setGlobalState;
}

export async function unmount() {
  instance!.unmount();
  instance!._container!.innerHTML = "";
  destroyRouter();
}
