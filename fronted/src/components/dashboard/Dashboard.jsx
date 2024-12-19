
import './Dashboard.css';
// Importar los íconos de Leaflet
import { MapDev } from '../map/MapDev.jsx';

export const Dashboard = () => {
    // Obtener coordenadas del localStorage
    const coords = localStorage.getItem("coordenadasDomicilio")?.split(',') || [0, 0];
    const [lat, lng] = coords.map(coord => parseFloat(coord));

    return (
        <div className="dashboard-container">
            <h1>Dashboard de Usuario</h1>
            <MapDev className="dashboard-map" lat={lat} lng={lng} />
        </div>
    );
};