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
import Dashboard from "./components/dashboard/Dashboard"
import PrivateRoute from "./components/privateRoute/PrivateRoute"
import CreateProfile from "./components/profileForms/CreateProfile.js"
import EditProfile from "./components/profileForms//EditProfile.js"
import AddExperience from "./components/profileForms/AddExperience.js"
import AddEducation from './components/profileForms/AddEducation.js';

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
                    <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
                    <PrivateRoute exact path="/create-profile" component={CreateProfile}></PrivateRoute>
                    <PrivateRoute exact path="/edit-profile" component={EditProfile}></PrivateRoute>
                    <PrivateRoute exact path="/add-experience" component={AddExperience}></PrivateRoute>
                    <PrivateRoute exact path="/add-education" component={AddEducation}></PrivateRoute>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
  );
}

export default App;
