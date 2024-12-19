import './Dashboard.css';
import { MapDev } from '../map/MapDev.jsx';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Panel } from 'primereact/panel';
import { useState } from 'react';

export const Dashboard = () => {
    // Obtener coordenadas del localStorage
    const coords = localStorage.getItem("coordenadasDomicilio")?.split(',') || [0, 0];
    const [lat, lng] = coords.map(coord => parseFloat(coord));

    return (
        <div className="dashboard">
            <Card className="dashboard-container">
                <div className="card-header">
                    <h1 className="dashboard-title">Dashboard de Usuario</h1>
                    <p className="dashboard-description">
                        Aquí puedes visualizar la ubicación en el mapa con las coordenadas del domicilio del usuario.
                    </p>
                </div>
                
                {/* Sección para detalles y mapa */}
                <Divider />
                <Panel header="Ubicación en el Mapa">
                    <div className="map-container">
                        <MapDev className="dashboard-map" lat={lat} lng={lng} />
                    </div>
                </Panel>
            </Card>
        </div>
    );
};
