import { DashboardMapPanel } from "./DashboardMapPanel.JSX";

export const UserDashboard = ({ lat, lng }) => (
    <div className="user-content">
        <div className="welcome-message">
            <i className="pi pi-map-marker" style={{ fontSize: '2rem', color: '#10b981' }}></i>
            <h3>Bienvenido a tu Dashboard</h3>
            <p>Aquí puedes visualizar la ubicación de tu domicilio registrado.</p>
        </div>
        <DashboardMapPanel lat={lat} lng={lng} />
    </div>
);
