import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

export async function mount(props:any) {
  console.log('mount',props);
  
  // const root = ReactDOM.createRoot(
  //   document.getElementById('root') as HTMLElement
  // );
  // root.render(<App />);
  // @ts-ignore
  ReactDOM.render(<App />, props.container ? props.container.querySelector('#root') : document.getElementById('root'));
}

export async function unmount(props:any) {
  console.log('unmount',props);

  // const root = ReactDOM.createRoot(
  //   document.getElementById('root') as HTMLElement
  // );
  // root.unmount()
  // @ts-ignore

  ReactDOM.unmountComponentAtNode(
    props.container ? props.container.querySelector('#root') : document.getElementById('root'),
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
