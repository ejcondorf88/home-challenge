import { Panel } from 'primereact/panel';
import { Chip } from 'primereact/chip';
import { MapDev } from '../map';
export const DashboardMapPanel = ({ lat, lng }) => (
    <Panel 
        header="📍 Ubicación en el Mapa" 
        className="map-panel"
        toggleable
    >
        <div className="map-info-container">
            <div className="coordinates-info">
                <Chip 
                    label={`Lat: ${lat.toFixed(6)}`} 
                    icon="pi pi-map-marker"
                    className="coordinate-chip"
                />
                <Chip 
                    label={`Lng: ${lng.toFixed(6)}`} 
                    icon="pi pi-compass"
                    className="coordinate-chip"
                />
            </div>
            <div className="map-container-enhanced">
                <MapDev className="dashboard-map" lat={lat} lng={lng} />
            </div>
        </div>
    </Panel>
);
