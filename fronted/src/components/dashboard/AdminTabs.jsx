import { TabView, TabPanel } from 'primereact/tabview';
import { DashboardMapPanel } from './DashboardMapPanel.JSX';
import { UserRegistrationForm } from '../admin/UserRegistrationForm.jsx';
export const AdminTabs = ({ refreshKey, onUserCreated, lat, lng }) => (
    <TabView className="dashboard-tabview">
        <TabPanel 
            header="Registrar Usuario" 
            leftIcon="pi pi-user-plus mr-2"
        >
            <div className="tab-content-wrapper">
                <div className="tab-description">
                    <i className="pi pi-info-circle"></i>
                    <span>Complete el formulario para registrar un nuevo usuario en el sistema.</span>
                </div>
                <UserRegistrationForm 
                    onUserCreated={onUserCreated} 
                    key={refreshKey} 
                />
            </div>
        </TabPanel>
        <TabPanel 
            header="Mapa" 
            leftIcon="pi pi-map mr-2"
        >
            <div className="tab-content-wrapper">
                <div className="tab-description">
                    <i className="pi pi-info-circle"></i>
                    <span>Visualiza la ubicación del domicilio en el mapa interactivo.</span>
                </div>
                <DashboardMapPanel lat={lat} lng={lng} />
            </div>
        </TabPanel>
    </TabView>
);
