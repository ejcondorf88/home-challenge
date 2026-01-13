import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";


import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import { loadApiConfig } from './config/api';

// Cargar configuración de API antes de renderizar la app
loadApiConfig().then(() => {
  createRoot(document.getElementById('root')).render(
    <PrimeReactProvider>
    <BrowserRouter>
    <StrictMode>
      <App  />
    </StrictMode>
    </BrowserRouter>
    </PrimeReactProvider>
  )
});
