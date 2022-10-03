import "./public-path";
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { microAppMixin } from "./qiankun";
import getRouter from "./router";

Vue.config.productionTip = false;

let instance;

function render(props = {}) {
  const { container,basepath } = props;

  instance = new Vue({
    name: "VueApp",
    router: getRouter(basepath),
    store,
    render: (h) => h(App),
    mixins: container ? [microAppMixin] : undefined,
  }).$mount(container ? container.querySelector("#app") : "#app");
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}

export async function mount(props) {
  console.log("[vue] vue app mount", props);
  props.onGlobalStateChange((state) => {
    store.dispatch("app/changeTheme", state.theme);
  }, true);
  render(props);
}

export async function unmount() {
  console.log("[vue] vue app unmount");
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
}
