import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import ThemeColor from '@/components/ThemeColor';
import ChangeMicroAppButton from './components/ChangeMicroAppButton';
import ChangeRoute from './components/ChangeRoute';
import { useLocation, useMatch } from 'react-router';


function App() {

  const location = useLocation();

  const matched = useMatch(location.pathname)

  useEffect(() => {
    console.log(matched)
  }, [matched])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ThemeColor />
        <ChangeMicroAppButton/>
        <ChangeRoute/>
      </header>
    </div>
  );
}

export default App;
