import logo from '@/assets/logo.svg';
import ChangeMicroAppButton from '@/components/ChangeMicroAppButton';
import ChangeRoute from '@/components/ChangeRoute';
import ThemeColor from '@/components/ThemeColor';
import './index.css';

function App() {
  function throwPromiseError() {
    return Promise.reject('react-ts-app promise error1');
  }
  function throwSetTimeoutError() {
    setTimeout(() => {
      throw new Error('react-ts-app settimeout error1');
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
            throw new Error('react-ts-app error1');
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
