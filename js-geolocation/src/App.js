import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router, 
  Route, 
  Link, 
  Switch
} from 'react-router-dom'

import Main from './components/main'
import MapComponent from './components/map-component'
import {getUserLocation} from './lib/location'

class App extends Component {

  componentDidMount() {
    getUserLocation()
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route component={MapComponent} path='/geolocation' />
            <Route component={Main} path='/' />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
