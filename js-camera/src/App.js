import React from 'react'
import {
  BrowserRouter as Router, 
  Route, 
  Link, 
  Switch
} from 'react-router-dom'
import CameraWithExperimental from './components/camera-with-experimental'
import Camera from './components/camera'
import './App.css'

const App = () =>
  <Router>
    <div>
      <ul>
        <li><Link to='/camera-with-experimental'>Camera with experimental features(ImageCapture)</Link></li>
        <li><Link to='/camera'>Camera with ordinary features(Canvas to png)</Link></li>
      </ul>
    <Switch>
      <Route component={CameraWithExperimental} path='/camera-with-experimental' />
      <Route component={Camera} path='/camera' />
    </Switch>
    </div>
  </Router>

export default App