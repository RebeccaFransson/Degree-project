import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

process.on('unhandledRejection', (reason, p) => {
  console.error('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason)
  console.error(reason)
  console.log(reason && reason.stack)
})

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
