import './public-path';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

let instance
// let subDiv

function render(props = {}) {
  const { container, shared } = props;
  Vue.prototype.$shared = shared;

  instance = new Vue({
    name:'micro-vue-app',
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');

  // if(window.__POWERED_BY_QIANKUN__&&process.env.NODE_ENV==='development'){
  //   subDiv = document.createElement('div')
  //   subDiv.__vue__ = instance
  //   document.body.appendChild(subDiv)
  // }
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

  // subDiv.__vue__ = null;
  // document.body.removeChild(subDiv)
  // subDiv = null;
}

