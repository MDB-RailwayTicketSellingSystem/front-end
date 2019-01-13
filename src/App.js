import React, { Component } from 'react';
import Base from './Base';
import NavBar from './component/NavBar';
import { BrowserRouter as Router,Route} from 'react-router-dom';

const App = () => (
    <div>
        <NavBar />
        <Base />
    </div>
);

export default App;
/*
class App extends Component {
  render() {
    return (
      <Router >
          <div>
              <Route path="/" component={Base} />
              <Route path="/Test" component={Test}/>
              <Route path="/SignIn" component={SignIn} />
              <Route path="/Booking" component={Booking} />
              <Route path="/Results" component={Results} />
              <Route path="/Orders" component={Orders} />

          </div>
      </Router>

    );
  }
}*/