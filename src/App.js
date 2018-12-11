import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Test from './pages/Test'
import Base from './Base';
import SignIn from './pages/SignIn'
import { BrowserRouter as Router,Route} from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <Router >
          <div>
              <Route path="/" component={Base} />
              <Route path="/Test" component={Test}/>
              <Route path="/SignIn" component={SignIn} />
          </div>
      </Router>

    );
  }
}

export default App;
