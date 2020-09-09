import React from 'react';
import Navbar from './components/layout/Navbar.js'
import Landing from './components/layout/Landing.js'
import {BrowserRouter, Route,Switch} from "react-router-dom"
import './App.css';

import Login from "./components/auth/Login.js"
import Register from "./components/auth/Register.js"

function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <Navbar></Navbar>
            <Switch>
                <Route exact path="/" component={Landing}></Route>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/register" component={Register}></Route>
            </Switch>

        </div>
    </BrowserRouter>

  );
}

export default App;
