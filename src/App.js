import React, { Component } from 'react';

import Test from './pages/Test'
import Base from './pages/Base';
import SignIn from './pages/SignIn'
import experiment from './pages/Experiment1'
import ManagerPage1 from './pages/ManagerPage1'
import { BrowserRouter as Router,Route} from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <Router >
          <div>
              <Route path="/" component={Base} />
              <Route path="/Test" component={Test}/>
              <Route path="/SignIn" component={SignIn} />
              <Route path="/Experiment" component={experiment} />
              <Route path="/ManagerPage1" component={ManagerPage1} />
          </div>
      </Router>

    );
  }
}

export default App;
