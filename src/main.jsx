import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import './index.css'
import { MovieProvider } from './context/MovieContext.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <MantineProvider>
      <MovieProvider>
        <App />
      </MovieProvider>
    </MantineProvider>
  </React.StrictMode>
  ,
)
