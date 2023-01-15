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
            throw new Error('1');
          }}
        >
          error
        </button>
      </header>
    </div>
  );
}

export default App;
