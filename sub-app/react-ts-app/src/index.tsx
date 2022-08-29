import './public-path';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
let root: ReactDOM.Root | undefined = undefined

function render(props:any){
  const { container } = props;
  // @ts-ignore
  const View =  <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/app-react' : '/'}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
  if(container){
    root = ReactDOM.createRoot(
      container
    )
    root.render(View)
  }else{
    root = ReactDOM.createRoot(
      document.getElementById('root') as HTMLElement
    );
    root.render(View);
  }
}

// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props:any) {
  render(props);
}

export async function unmount(props:any) {
  const { container } = props;
  if(container){
    root!.unmount()
  }else{
    root!.unmount()
  }
  // @ts-ignore
  // ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
