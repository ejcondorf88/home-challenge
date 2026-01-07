import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Panel } from 'primereact/panel';
import { MapDev } from '../components/map/MapDev';
import './DashboardPage.css';

export const DashboardPage = () => {
    // Obtener coordenadas del localStorage
    const coords = localStorage.getItem("coordenadasDomicilio")?.split(',') || [0, 0];
    const [lat, lng] = coords.map(coord => parseFloat(coord));

    return (
        <div className="dashboard-page">
            <Card className="dashboard-container">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Dashboard de Usuario</h1>
                    <p className="dashboard-description">
                        Aquí puedes visualizar la ubicación en el mapa con las coordenadas del domicilio del usuario.
                    </p>
                </div>
                
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

