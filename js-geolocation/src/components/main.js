import React from 'react'
import {Link} from "react-router-dom"

const Main = () =>
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh'

  }}>
    <Link to='/geolocation'>Start geolocation test'</Link>
  </div>

export default Main