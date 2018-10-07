import React                    from 'react'
import ReactDOM                 from 'react-dom'
import { BrowserRouter }        from 'react-router-dom'

import Routes                   from './routes/routes'

import './index.css'
import 'typeface-roboto'

ReactDOM.render(
  <BrowserRouter >
    <Routes/>
  </BrowserRouter>,
  document.getElementById('root')
)

