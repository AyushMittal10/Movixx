import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import {store} from './store/store'
import { Provider } from 'react-redux'

// props meh store lega jo hum ne bnaya ye Provider (React-Redux connectivity ke liye)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />,
  </Provider>
    
)
