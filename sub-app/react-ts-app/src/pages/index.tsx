import logo from '@/assets/logo.svg';
import ChangeMicroAppButton from '@/components/ChangeMicroAppButton';
import ChangeRoute from '@/components/ChangeRoute';
import ThemeColor from '@/components/ThemeColor';
import './index.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ThemeColor />
        <ChangeMicroAppButton />
        <ChangeRoute />
        <button
          onClick={() => {
            throw new Error('error');
          }}
        >
          error
        </button>
        <button
          onClick={() => {
            Promise.reject(new Error('promise error'));
          }}
        >
          promise error
        </button>
        <button
          onClick={() => {
            setTimeout(() => {
              throw new Error('timeout error');
            });
          }}
        >
          timeout error
        </button>
      </header>
    </div>
  );
}

export default App;
