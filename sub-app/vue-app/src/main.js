import './public-path';
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import store from './store'

Vue.config.productionTip = false

let router = null;
let instance = null;

function render(props = {}) {
  const { container, shared } = props;
  Vue.prototype.$shared = shared

  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/app-vue/index' : '/',
    mode: 'history',
  });

  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}

export async function mount(props) {
  console.log('[vue] vue app mount', props);
  props.onGlobalStateChange((state)=>{
    store.dispatch('app/changeTheme', state.theme)
  }, true)
  render(props);
}

export async function unmount() {
  console.log('[vue] vue app unmount');
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
}

