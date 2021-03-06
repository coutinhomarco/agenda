import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Register from './pages/Register';
import Contacts from './pages/Contacts';
import './App.css';
import Provider from './context/Provider';
import Tasks from './pages/Tasks';

function App() {
  return (
    <div className="App">
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Provider>
        <Switch>
          <Route exact path="/"><Login /></Route>
          <Route exact path="/tasks"><Tasks /></Route>
          <Route exact path="/register"><Register /></Route>
          <Route path="/contacts"><Contacts /></Route>
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
