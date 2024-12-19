import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';


import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';

createRoot(document.getElementById('root')).render(
  <PrimeReactProvider>
  <BrowserRouter>
  <StrictMode>
    <App  />
  </StrictMode>
  </BrowserRouter>
  </PrimeReactProvider>

)
