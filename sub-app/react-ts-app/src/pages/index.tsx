import logo from '@/assets/logo.svg';
import ChangeMicroAppButton from '@/components/ChangeMicroAppButton';
import ChangeRoute from '@/components/ChangeRoute';
import ThemeColor from '@/components/ThemeColor';
import './index.css';

function App() {
  function throwPromiseError() {
    return Promise.reject('vue-app promise error1');
  }
  function throwSetTimeoutError() {
    setTimeout(() => {
      throw new Error('vue-app settimeout error1');
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ThemeColor />
        <ChangeMicroAppButton />
        <ChangeRoute />
        <button
          onClick={() => {
            throw new Error('1');
          }}
        >
          error
        </button>
        <button onClick={throwPromiseError}>PromiseError</button>
        <button onClick={throwSetTimeoutError}>SetTimeoutError</button>
      </header>
    </div>
  );
}

export default App;
