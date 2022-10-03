import './public-path';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { appActions } from './store/module/app';
import { SharedContext } from './context/SharedContext';
import { Store } from 'redux';

let root: ReactDOM.Root | null;
let sharedDispatcher: any;

function render(props: any) {
  const { container, shared, basepath } = props;
  sharedDispatcher = shared;
  if (container) {
    root = ReactDOM.createRoot(container.querySelector('#root'));
  } else {
    root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  }
  root.render(
    <React.StrictMode>
      <SharedContext.Provider value={shared}>
        <Provider store={store}>
          {/* @ts-ignore */}
          <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? basepath : '/'}>
            <App />
          </BrowserRouter>
        </Provider>
      </SharedContext.Provider>
    </React.StrictMode>,
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props: any) {
  console.log('[react16] react app mount');

  props.onGlobalStateChange((state: any) => {
    store.dispatch(appActions.updateTheme(state.theme));
  }, true);

  render(props);
}

export async function unmount(props: any) {
  console.log('[react16] react app unmount');
  sharedDispatcher?.dispatch({ type: 'UPDATE_ROUTES', payload: [] });
  sharedDispatcher = null;
  root!.unmount();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
