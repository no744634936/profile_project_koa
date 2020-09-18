import React,{useEffect}from 'react';
import Navbar from './components/layout/Navbar.js'
import Landing from './components/layout/Landing.js'
import {BrowserRouter, Route,Switch} from "react-router-dom"
import {Provider} from "react-redux"
import store from "./redux/store.js"
import './App.css';
import Register_with_redux from "./components/auth/Register_with_redux.js"

import Alert from "./components/layout/Alert"
import Login_with_redux from './components/auth/Login_with_redux.js';
import {loadUserAction} from "./redux//authentication/authenticationAction.js"

function App() {

    useEffect(()=>{
        store.dispatch(loadUserAction())
    },[])

  return (
    <Provider store={store}>
        <BrowserRouter>
            <div className="App">
                <Navbar></Navbar>
                <Alert></Alert>
                <Switch>
                    <Route exact path="/" component={Landing}></Route>
                    <Route exact path="/login" component={Login_with_redux}></Route>
                    <Route exact path="/register" component={Register_with_redux}></Route>
                </Switch>

            </div>
        </BrowserRouter>
    </Provider>
  );
}

export default App;
