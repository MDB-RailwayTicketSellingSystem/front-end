import React, { Component } from 'react';
import SignIn from './pages/SignIn';
import Booking from './pages/Booking';
import Results from './pages/Results';
import Orders from './pages/Orders';
import Test from './pages/Test';

import {Switch,Route} from 'react-router-dom';

const Base = () =>(
    <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/Test" component={Test}/>
        <Route path="/Booking/:accountID" component={Booking} />
        <Route path="/Results/:accountID/:start/:end/:date" component={Results} />
        <Route path="/Orders/:accountID" component={Orders} />
    </Switch>
);
export default Base;
