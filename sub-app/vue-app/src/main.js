import './public-path';
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

Vue.config.productionTip = false

let router = null;
let instance = null;

function render(props = {}) {
  const { container } = props;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/micro-app/app-vue' : '/',
    mode: 'history',
  });

  instance = new Vue({
    router,
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
  render(props);
}

export async function unmount() {
  console.log('[vue] vue app unmount');
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
}

