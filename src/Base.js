import React, { Component } from 'react';
import SignIn from './pages/SignIn';
import Booking from './pages/Booking';
import Results from './pages/Results';
import Orders from './pages/Orders';
import Test from './pages/Test';
import experiment from './pages/Experiment1'
import ManagerPage1 from './pages/ManagerPage1'
import {Switch,Route} from 'react-router-dom';

const Base = () =>(
    <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/Test" component={Test}/>
        <Route path="/Booking/:accountID" component={Booking} />
        <Route path="/Results/:accountID/:start/:end/:date" component={Results} />
        <Route path="/Orders/:accountID" component={Orders} />
        <Route path="/Experiment" component={experiment} />
        <Route path="/ManagerPage1" component={ManagerPage1} />
    </Switch>
);
export default Base;
