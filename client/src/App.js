import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Agenda from './pages/Agenda';
import './App.css';
import Provider from './context/Provider';

function App() {
  return (
    <div className="App">
      <Provider>
        <Switch>
          <Route exact path="/"><Login /></Route>
          <Route exact path="/register"><Register /></Route>
          <Route path="/agenda"><Agenda /></Route>
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
