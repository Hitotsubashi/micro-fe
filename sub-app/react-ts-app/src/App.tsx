import React from 'react';
import logo from './logo.svg';
import './App.css';
import ThemeColor from '@/components/ThemeColor';
import ChangeRouteButton from './components/ChangeRouteButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ThemeColor />
        <ChangeRouteButton/>
      </header>
    </div>
  );
}

export default App;
