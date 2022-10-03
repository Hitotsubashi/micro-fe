import "./public-path";
import { createApp } from "vue";
import App from "./App.vue";
import pinia from "./pinia";
import { useAppStore } from "./pinia/modules/app";

let instance: ReturnType<typeof createApp> | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function render(props: any) {
  const { container } = props;
  instance = createApp(App).use(pinia);
  instance.mount(container ? container.querySelector("#app") : "#app");
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log("%c%s", "color: green;", "vue3.0 app bootstraped");
}

export async function mount(props: any) {
  render(props);
  props.onGlobalStateChange((state: any) => {
    const app = useAppStore();
    app.changeTheme(state.theme);
  });
}

export async function unmount() {
  instance!.unmount();
  instance!._container!.innerHTML = "";
}
