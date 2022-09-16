import React from 'react';
import logo from '@/assets/logo.svg';
import './index.css';
import ThemeColor from '@/components/ThemeColor';
import ChangeMicroAppButton from '@/components/ChangeMicroAppButton';
import ChangeRoute from '@/components/ChangeRoute';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ThemeColor />
        <ChangeMicroAppButton />
        <ChangeRoute />
      </header>
    </div>
  );
}

export default App;
