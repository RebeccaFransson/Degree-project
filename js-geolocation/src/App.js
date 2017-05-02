import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router, 
  Route, 
  Link, 
  Switch
} from 'react-router-dom'

import Geolocation from './components/geolocation'

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Link to='/geolocation'>Start geolocation test</Link>

          <Switch>
            <Route component={Geolocation} path='/geolocation' />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
