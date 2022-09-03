import React from 'react';
import logo from './logo.svg';
import './App.css';
import ThemeColor from '@/components/ThemeColor';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ThemeColor />
      </header>
    </div>
  );
}

export default App;
