import React from 'react';
import logo from './logo.svg';
import './App.css';
import ThemeColor from '@/components/ThemeColor';
import ChangeMicroAppButton from './components/ChangeMicroAppButton';
import ChangeRoute, { routes } from './components/ChangeRoute';
import {basename} from '@/index'
import {  matchRoutes,  useLocation } from "react-router-dom";
import { useShared } from "@/context/SharedContext";
import {  useEffect } from "react";

function App() {

  const location = useLocation()

    const shared = useShared()

    useEffect(() => {
        // @ts-ignore
        if(window.__POWERED_BY_QIANKUN__){
            const matched = matchRoutes(routes, location.pathname)!
            
            console.log('matched',matched);
            
            if(matched.length===0){
              console.log(404)
            }
                
            shared!.dispatch({
              type:'UPDATE_ROUTES', 
              payload: matched.map(({route, pathname})=>({
                path: basename+pathname,
                // @ts-ignore
                meta: route.meta
              }))
            })
        }
    }, [location.pathname,shared])

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
